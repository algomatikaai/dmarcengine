#!/bin/bash

# DMARCEngine Perfect Email Infrastructure Setup Script
# This script sets up bulletproof DMARC configuration for all our domains

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
DOMAINS=("regulens.ai" "dmarc-audit.com" "email-auth.expert" "compliance-scanner.co")
REPORT_EMAIL="dmarc-reports@regulens.ai"
FAILURE_EMAIL="dmarc-failures@regulens.ai"

echo -e "${BLUE}🚀 DMARCEngine Perfect DMARC Infrastructure Setup${NC}"
echo "================================================="
echo ""

# Check prerequisites
check_prerequisites() {
    echo -e "${YELLOW}Checking prerequisites...${NC}"
    
    # Check if dig is available
    if ! command -v dig &> /dev/null; then
        echo -e "${RED}❌ dig command not found. Please install bind-utils${NC}"
        exit 1
    fi
    
    # Check if openssl is available
    if ! command -v openssl &> /dev/null; then
        echo -e "${RED}❌ openssl command not found. Please install openssl${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ Prerequisites checked${NC}"
    echo ""
}

# Generate DKIM keys
generate_dkim_keys() {
    local domain=$1
    local selector=$2
    
    echo -e "${YELLOW}Generating DKIM keys for ${domain} (selector: ${selector})...${NC}"
    
    # Create keys directory if it doesn't exist
    mkdir -p "keys/${domain}"
    
    # Generate private key
    openssl genrsa -out "keys/${domain}/${selector}.private" 2048
    
    # Generate public key
    openssl rsa -in "keys/${domain}/${selector}.private" -pubout -outform der 2>/dev/null | openssl base64 -A > "keys/${domain}/${selector}.public"
    
    # Create DNS record format
    local public_key=$(cat "keys/${domain}/${selector}.public")
    echo "v=DKIM1; k=rsa; p=${public_key}" > "keys/${domain}/${selector}.dns"
    
    echo -e "${GREEN}✅ DKIM keys generated for ${domain}${NC}"
}

# Check current DNS records
check_dns_records() {
    local domain=$1
    
    echo -e "${YELLOW}Checking current DNS records for ${domain}...${NC}"
    
    # Check SPF
    echo "SPF Record:"
    dig +short TXT "${domain}" | grep "v=spf1" || echo "  No SPF record found"
    
    # Check DMARC
    echo "DMARC Record:"
    dig +short TXT "_dmarc.${domain}" | grep "v=DMARC1" || echo "  No DMARC record found"
    
    # Check DKIM (try common selectors)
    echo "DKIM Records:"
    for selector in "default" "selector1" "selector2" "mail" "dkim"; do
        local dkim_result=$(dig +short TXT "${selector}._domainkey.${domain}" | grep "v=DKIM1")
        if [ ! -z "$dkim_result" ]; then
            echo "  ${selector}: Found"
        fi
    done
    
    echo ""
}

# Generate DNS records file
generate_dns_records() {
    local domain=$1
    
    echo -e "${YELLOW}Generating DNS records for ${domain}...${NC}"
    
    # Create DNS records directory
    mkdir -p "dns-records"
    
    local dns_file="dns-records/${domain}-records.txt"
    
    cat > "$dns_file" << EOF
# DNS Records for ${domain}
# Generated on $(date)

# SPF Record (Allow Amazon SES and SendGrid)
${domain}.    TXT    "v=spf1 include:amazonses.com include:sendgrid.net -all"

# DMARC Record (Strict Policy)
_dmarc.${domain}.    TXT    "v=DMARC1; p=reject; rua=mailto:${REPORT_EMAIL}; ruf=mailto:${FAILURE_EMAIL}; sp=reject; adkim=s; aspf=s; fo=1; pct=100"

# DKIM Record (if key exists)
EOF

    # Add DKIM record if key exists
    if [ -f "keys/${domain}/selector1.dns" ]; then
        local dkim_record=$(cat "keys/${domain}/selector1.dns")
        echo "selector1._domainkey.${domain}.    TXT    \"${dkim_record}\"" >> "$dns_file"
    fi
    
    # Add BIMI record for main domain
    if [ "$domain" = "regulens.ai" ]; then
        echo "" >> "$dns_file"
        echo "# BIMI Record (Visual Trust Indicator)" >> "$dns_file"
        echo "default._bimi.${domain}.    TXT    \"v=BIMI1; l=https://${domain}/logo.svg; a=https://${domain}/vmc.pem\"" >> "$dns_file"
    fi
    
    echo -e "${GREEN}✅ DNS records generated: ${dns_file}${NC}"
}

# Test DMARC configuration
test_dmarc_config() {
    local domain=$1
    
    echo -e "${YELLOW}Testing DMARC configuration for ${domain}...${NC}"
    
    # Check if records are properly formatted
    local dmarc_record=$(dig +short TXT "_dmarc.${domain}" | tr -d '"' | grep "v=DMARC1")
    
    if [ -z "$dmarc_record" ]; then
        echo -e "${RED}❌ No DMARC record found${NC}"
        return 1
    fi
    
    # Parse DMARC record
    echo "DMARC Record Analysis:"
    echo "  Record: $dmarc_record"
    
    # Check policy
    if echo "$dmarc_record" | grep -q "p=reject"; then
        echo -e "  Policy: ${GREEN}reject (Excellent)${NC}"
    elif echo "$dmarc_record" | grep -q "p=quarantine"; then
        echo -e "  Policy: ${YELLOW}quarantine (Good)${NC}"
    elif echo "$dmarc_record" | grep -q "p=none"; then
        echo -e "  Policy: ${YELLOW}none (Monitor only)${NC}"
    fi
    
    # Check alignment
    if echo "$dmarc_record" | grep -q "adkim=s"; then
        echo -e "  DKIM Alignment: ${GREEN}strict${NC}"
    else
        echo -e "  DKIM Alignment: ${YELLOW}relaxed${NC}"
    fi
    
    if echo "$dmarc_record" | grep -q "aspf=s"; then
        echo -e "  SPF Alignment: ${GREEN}strict${NC}"
    else
        echo -e "  SPF Alignment: ${YELLOW}relaxed${NC}"
    fi
    
    echo ""
}

# Generate monitoring script
generate_monitoring_script() {
    echo -e "${YELLOW}Generating monitoring script...${NC}"
    
    cat > "scripts/check-domain-health.sh" << 'EOF'
#!/bin/bash

# Daily domain health check script
# Monitors DMARC, SPF, DKIM configuration for all domains

DOMAINS=("regulens.ai" "dmarc-audit.com" "email-auth.expert" "compliance-scanner.co")
DATE=$(date '+%Y-%m-%d %H:%M:%S')

echo "=== Domain Health Check - $DATE ==="

for domain in "${DOMAINS[@]}"; do
    echo ""
    echo "Checking $domain..."
    
    # Check SPF
    spf_record=$(dig +short TXT "$domain" | grep "v=spf1" | head -1)
    if [ ! -z "$spf_record" ]; then
        echo "  ✅ SPF: Found"
    else
        echo "  ❌ SPF: Missing"
    fi
    
    # Check DMARC
    dmarc_record=$(dig +short TXT "_dmarc.$domain" | grep "v=DMARC1" | head -1)
    if [ ! -z "$dmarc_record" ]; then
        echo "  ✅ DMARC: Found"
        if echo "$dmarc_record" | grep -q "p=reject"; then
            echo "    ✅ Policy: reject"
        else
            echo "    ⚠️  Policy: not reject"
        fi
    else
        echo "  ❌ DMARC: Missing"
    fi
    
    # Check DKIM (common selectors)
    dkim_found=false
    for selector in "selector1" "default" "mail"; do
        dkim_record=$(dig +short TXT "${selector}._domainkey.$domain" | grep "v=DKIM1" | head -1)
        if [ ! -z "$dkim_record" ]; then
            echo "  ✅ DKIM ($selector): Found"
            dkim_found=true
            break
        fi
    done
    
    if [ "$dkim_found" = false ]; then
        echo "  ❌ DKIM: Missing"
    fi
    
    # Overall health score
    health_score=0
    [ ! -z "$spf_record" ] && health_score=$((health_score + 1))
    [ ! -z "$dmarc_record" ] && health_score=$((health_score + 1))
    [ "$dkim_found" = true ] && health_score=$((health_score + 1))
    
    echo "  📊 Health Score: $health_score/3"
done

echo ""
echo "=== Health Check Complete ==="
EOF

    chmod +x "scripts/check-domain-health.sh"
    echo -e "${GREEN}✅ Monitoring script created: scripts/check-domain-health.sh${NC}"
}

# Generate DMARC report parser
generate_report_parser() {
    echo -e "${YELLOW}Generating DMARC report parser...${NC}"
    
    mkdir -p "scripts"
    
    cat > "scripts/parse-dmarc-reports.py" << 'EOF'
#!/usr/bin/env python3

"""
DMARC Report Parser for DMARCEngine
Parses incoming DMARC reports and generates deliverability statistics
"""

import xml.etree.ElementTree as ET
import json
import sys
from datetime import datetime

def parse_dmarc_report(xml_content):
    """Parse DMARC XML report and extract key metrics"""
    
    try:
        root = ET.fromstring(xml_content)
        
        # Extract report metadata
        report_metadata = root.find('report_metadata')
        org_name = report_metadata.find('org_name').text
        report_id = report_metadata.find('report_id').text
        date_range = {
            'begin': int(report_metadata.find('date_range/begin').text),
            'end': int(report_metadata.find('date_range/end').text)
        }
        
        # Extract policy published
        policy = root.find('policy_published')
        published_policy = {
            'domain': policy.find('domain').text,
            'p': policy.find('p').text,
            'sp': policy.find('sp').text if policy.find('sp') is not None else '',
            'adkim': policy.find('adkim').text if policy.find('adkim') is not None else 'r',
            'aspf': policy.find('aspf').text if policy.find('aspf') is not None else 'r'
        }
        
        # Extract and analyze records
        records = []
        total_messages = 0
        spf_pass = 0
        dkim_pass = 0
        dmarc_pass = 0
        
        for record in root.findall('record'):
            row = record.find('row')
            source_ip = row.find('source_ip').text
            count = int(row.find('count').text)
            
            # Policy evaluation
            policy_eval = row.find('policy_evaluated')
            disposition = policy_eval.find('disposition').text
            spf_result = policy_eval.find('spf').text
            dkim_result = policy_eval.find('dkim').text
            
            # Authentication results
            auth_results = record.find('auth_results')
            
            # SPF results
            spf_auth = auth_results.find('spf')
            spf_domain = spf_auth.find('domain').text if spf_auth is not None else ''
            spf_auth_result = spf_auth.find('result').text if spf_auth is not None else 'none'
            
            # DKIM results
            dkim_auth = auth_results.find('dkim')
            dkim_domain = dkim_auth.find('domain').text if dkim_auth is not None else ''
            dkim_auth_result = dkim_auth.find('result').text if dkim_auth is not None else 'none'
            
            records.append({
                'source_ip': source_ip,
                'count': count,
                'disposition': disposition,
                'spf_result': spf_result,
                'dkim_result': dkim_result,
                'spf_auth_result': spf_auth_result,
                'dkim_auth_result': dkim_auth_result
            })
            
            total_messages += count
            
            if spf_result == 'pass':
                spf_pass += count
            if dkim_result == 'pass':
                dkim_pass += count
            if spf_result == 'pass' and dkim_result == 'pass':
                dmarc_pass += count
        
        # Calculate percentages
        spf_pass_rate = (spf_pass / total_messages * 100) if total_messages > 0 else 0
        dkim_pass_rate = (dkim_pass / total_messages * 100) if total_messages > 0 else 0
        dmarc_pass_rate = (dmarc_pass / total_messages * 100) if total_messages > 0 else 0
        
        return {
            'report_metadata': {
                'org_name': org_name,
                'report_id': report_id,
                'date_range': date_range
            },
            'policy': published_policy,
            'statistics': {
                'total_messages': total_messages,
                'spf_pass_count': spf_pass,
                'dkim_pass_count': dkim_pass,
                'dmarc_pass_count': dmarc_pass,
                'spf_pass_rate': spf_pass_rate,
                'dkim_pass_rate': dkim_pass_rate,
                'dmarc_pass_rate': dmarc_pass_rate
            },
            'records': records
        }
        
    except Exception as e:
        return {'error': f'Failed to parse DMARC report: {str(e)}'}

def generate_summary_report(parsed_reports):
    """Generate summary statistics from multiple DMARC reports"""
    
    total_messages = 0
    total_spf_pass = 0
    total_dkim_pass = 0
    total_dmarc_pass = 0
    
    for report in parsed_reports:
        if 'statistics' in report:
            stats = report['statistics']
            total_messages += stats['total_messages']
            total_spf_pass += stats['spf_pass_count']
            total_dkim_pass += stats['dkim_pass_count']
            total_dmarc_pass += stats['dmarc_pass_count']
    
    overall_spf_rate = (total_spf_pass / total_messages * 100) if total_messages > 0 else 0
    overall_dkim_rate = (total_dkim_pass / total_messages * 100) if total_messages > 0 else 0
    overall_dmarc_rate = (total_dmarc_pass / total_messages * 100) if total_messages > 0 else 0
    
    return {
        'summary': {
            'total_messages': total_messages,
            'overall_spf_pass_rate': overall_spf_rate,
            'overall_dkim_pass_rate': overall_dkim_rate,
            'overall_dmarc_pass_rate': overall_dmarc_rate,
            'generated_at': datetime.now().isoformat()
        },
        'target_rates': {
            'spf': 100.0,
            'dkim': 100.0,
            'dmarc': 100.0
        },
        'performance_status': {
            'spf': 'excellent' if overall_spf_rate >= 99 else 'good' if overall_spf_rate >= 95 else 'needs_improvement',
            'dkim': 'excellent' if overall_dkim_rate >= 99 else 'good' if overall_dkim_rate >= 95 else 'needs_improvement',
            'dmarc': 'excellent' if overall_dmarc_rate >= 99 else 'good' if overall_dmarc_rate >= 95 else 'needs_improvement'
        }
    }

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: python3 parse-dmarc-reports.py <xml_file>")
        sys.exit(1)
    
    xml_file = sys.argv[1]
    
    try:
        with open(xml_file, 'r') as f:
            xml_content = f.read()
        
        result = parse_dmarc_report(xml_content)
        print(json.dumps(result, indent=2))
        
    except FileNotFoundError:
        print(f"Error: File {xml_file} not found")
        sys.exit(1)
    except Exception as e:
        print(f"Error: {str(e)}")
        sys.exit(1)
EOF

    chmod +x "scripts/parse-dmarc-reports.py"
    echo -e "${GREEN}✅ DMARC report parser created: scripts/parse-dmarc-reports.py${NC}"
}

# Main execution
main() {
    echo -e "${BLUE}Starting DMARCEngine Perfect DMARC Setup...${NC}"
    echo ""
    
    # Check prerequisites
    check_prerequisites
    
    # Create directories
    mkdir -p scripts keys dns-records logs
    
    # Process each domain
    for domain in "${DOMAINS[@]}"; do
        echo -e "${BLUE}Processing domain: ${domain}${NC}"
        echo "-----------------------------------"
        
        # Check current state
        check_dns_records "$domain"
        
        # Generate DKIM keys
        generate_dkim_keys "$domain" "selector1"
        
        # Generate DNS records
        generate_dns_records "$domain"
        
        # Test configuration (if records exist)
        test_dmarc_config "$domain"
        
        echo ""
    done
    
    # Generate monitoring tools
    generate_monitoring_script
    generate_report_parser
    
    echo -e "${GREEN}🎉 DMARCEngine Perfect DMARC Setup Complete!${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Review DNS records in dns-records/ directory"
    echo "2. Add DNS records to your DNS provider"
    echo "3. Configure email services with DKIM keys from keys/ directory"
    echo "4. Run daily monitoring: ./scripts/check-domain-health.sh"
    echo "5. Parse DMARC reports: ./scripts/parse-dmarc-reports.py report.xml"
    echo ""
    echo -e "${YELLOW}Important: Wait 24-48 hours after DNS changes before testing${NC}"
}

# Run main function
main "$@"