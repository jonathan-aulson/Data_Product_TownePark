---
title: "Development Security Standards"
version: "1.0"
last_updated: "2025-07-24"
author: "Towne Park Data Product Team"
status: "Active"
type: "Business Rules"
tags: ["security", "development", "standards", "business-rules", "compliance"]
related_docs:
  - "../development/code-quality-standards.md"
  - "../development/ai-tool-usage-policies.md"
  - "../../technical/backend/20250723_AI_TechnicalSpec_SDLCIntegration.md"
  - "ai-development-security.md"
---

# Development Security Standards

## Overview

This document establishes comprehensive security standards for the Towne Park Data Product development lifecycle. These standards ensure that security is integrated into every phase of development, from design through deployment and maintenance, protecting sensitive data, systems, and business operations.

## Security Framework

### Security Principles

#### Defense in Depth
- **Multiple Security Layers**: Implement security controls at multiple levels
- **Redundant Protection**: Ensure backup security measures for critical components
- **Fail-Safe Defaults**: Default to secure configurations and deny-by-default policies
- **Least Privilege**: Grant minimum necessary access and permissions

#### Security by Design
- **Threat Modeling**: Identify and address security threats during design phase
- **Secure Architecture**: Build security into system architecture from the ground up
- **Privacy by Design**: Incorporate privacy protection into all system components
- **Continuous Security**: Integrate security throughout the development lifecycle

#### Risk-Based Approach
- **Risk Assessment**: Regular evaluation of security risks and threats
- **Risk Mitigation**: Implement appropriate controls based on risk levels
- **Risk Monitoring**: Continuous monitoring of security posture and threats
- **Risk Communication**: Clear communication of risks to stakeholders

### Compliance Requirements

#### Regulatory Compliance
- **Data Protection**: GDPR, CCPA, and other privacy regulations
- **Financial Regulations**: SOX, PCI DSS for payment processing
- **Industry Standards**: ISO 27001, NIST Cybersecurity Framework
- **Healthcare Compliance**: HIPAA if handling health-related data

#### Organizational Policies
- **Corporate Security Policies**: Adherence to company-wide security standards
- **Data Classification**: Proper handling of classified and sensitive data
- **Access Control**: Role-based access control and identity management
- **Incident Response**: Security incident reporting and response procedures

## Secure Development Lifecycle (SDLC)

### Planning and Requirements

#### Security Requirements Gathering
1. **Functional Security Requirements**:
   - Authentication and authorization mechanisms
   - Data encryption and protection requirements
   - Audit logging and monitoring capabilities
   - Input validation and sanitization needs

2. **Non-Functional Security Requirements**:
   - Performance requirements for security controls
   - Availability and resilience requirements
   - Scalability considerations for security systems
   - Compliance and regulatory requirements

3. **Threat Modeling**:
   ```
   STRIDE Threat Analysis:
   - Spoofing: Identity verification mechanisms
   - Tampering: Data integrity protection
   - Repudiation: Non-repudiation controls
   - Information Disclosure: Data confidentiality
   - Denial of Service: Availability protection
   - Elevation of Privilege: Access control
   ```

#### Security Architecture Design
1. **Security Architecture Patterns**:
   - Zero Trust Architecture principles
   - Microservices security patterns
   - API security gateway patterns
   - Data protection and encryption patterns

2. **Security Controls Design**:
   - Authentication and authorization flows
   - Data classification and handling procedures
   - Network security and segmentation
   - Monitoring and logging architecture

### Development Phase

#### Secure Coding Standards

#### Input Validation and Sanitization
1. **Server-Side Validation**:
   ```csharp
   public class SecureInputValidator
   {
       public static bool ValidateCustomerName(string customerName)
       {
           if (string.IsNullOrWhiteSpace(customerName))
               return false;
           
           // Length validation
           if (customerName.Length > 255)
               return false;
           
           // Character whitelist validation
           var allowedPattern = @"^[a-zA-Z0-9\s\-\.,']+$";
           return Regex.IsMatch(customerName, allowedPattern);
       }
       
       public static bool ValidateEmail(string email)
       {
           if (string.IsNullOrWhiteSpace(email))
               return false;
           
           try
           {
               var addr = new MailAddress(email);
               return addr.Address == email;
           }
           catch
           {
               return false;
           }
       }
   }
   ```

2. **SQL Injection Prevention**:
   ```csharp
   // Correct: Using parameterized queries
   public async Task<CustomerSite> GetCustomerSiteAsync(int siteId, string customerName)
   {
       const string sql = @"
           SELECT Id, CustomerName, SiteAddress, ContractType
           FROM CustomerSites 
           WHERE Id = @SiteId AND CustomerName = @CustomerName";
       
       var parameters = new { SiteId = siteId, CustomerName = customerName };
       return await _connection.QuerySingleOrDefaultAsync<CustomerSite>(sql, parameters);
   }
   
   // Incorrect: String concatenation (vulnerable to SQL injection)
   // var sql = $"SELECT * FROM CustomerSites WHERE Id = {siteId}";
   ```

3. **Cross-Site Scripting (XSS) Prevention**:
   ```csharp
   public class XssProtection
   {
       public static string SanitizeHtml(string input)
       {
           if (string.IsNullOrEmpty(input))
               return string.Empty;
           
           // Use HtmlSanitizer library
           var sanitizer = new HtmlSanitizer();
           sanitizer.AllowedTags.Clear();
           sanitizer.AllowedTags.Add("p");
           sanitizer.AllowedTags.Add("br");
           sanitizer.AllowedTags.Add("strong");
           sanitizer.AllowedTags.Add("em");
           
           return sanitizer.Sanitize(input);
       }
       
       public static string EncodeForHtml(string input)
       {
           return HttpUtility.HtmlEncode(input);
       }
   }
   ```

#### Authentication and Authorization

1. **JWT Token Implementation**:
   ```csharp
   public class JwtTokenService
   {
       private readonly IConfiguration _configuration;
       private readonly string _secretKey;
       
       public JwtTokenService(IConfiguration configuration)
       {
           _configuration = configuration;
           _secretKey = _configuration["Jwt:SecretKey"];
       }
       
       public string GenerateToken(User user)
       {
           var tokenHandler = new JwtSecurityTokenHandler();
           var key = Encoding.ASCII.GetBytes(_secretKey);
           
           var tokenDescriptor = new SecurityTokenDescriptor
           {
               Subject = new ClaimsIdentity(new[]
               {
                   new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                   new Claim(ClaimTypes.Name, user.Username),
                   new Claim(ClaimTypes.Email, user.Email),
                   new Claim("role", user.Role)
               }),
               Expires = DateTime.UtcNow.AddHours(8),
               SigningCredentials = new SigningCredentials(
                   new SymmetricSecurityKey(key), 
                   SecurityAlgorithms.HmacSha256Signature)
           };
           
           var token = tokenHandler.CreateToken(tokenDescriptor);
           return tokenHandler.WriteToken(token);
       }
       
       public ClaimsPrincipal ValidateToken(string token)
       {
           var tokenHandler = new JwtSecurityTokenHandler();
           var key = Encoding.ASCII.GetBytes(_secretKey);
           
           try
           {
               var principal = tokenHandler.ValidateToken(token, new TokenValidationParameters
               {
                   ValidateIssuerSigningKey = true,
                   IssuerSigningKey = new SymmetricSecurityKey(key),
                   ValidateIssuer = false,
                   ValidateAudience = false,
                   ClockSkew = TimeSpan.Zero
               }, out SecurityToken validatedToken);
               
               return principal;
           }
           catch
           {
               return null;
           }
       }
   }
   ```

2. **Role-Based Access Control**:
   ```csharp
   [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
   public class RequirePermissionAttribute : Attribute, IAuthorizationFilter
   {
       private readonly string _permission;
       
       public RequirePermissionAttribute(string permission)
       {
           _permission = permission;
       }
       
       public void OnAuthorization(AuthorizationFilterContext context)
       {
           var user = context.HttpContext.User;
           
           if (!user.Identity.IsAuthenticated)
           {
               context.Result = new UnauthorizedResult();
               return;
           }
           
           var userPermissions = user.FindAll("permission").Select(c => c.Value);
           
           if (!userPermissions.Contains(_permission))
           {
               context.Result = new ForbidResult();
               return;
           }
       }
   }
   
   // Usage
   [RequirePermission("CustomerSites.Read")]
   public async Task<ActionResult<CustomerSite>> GetCustomerSite(int id)
   {
       // Implementation
   }
   ```

#### Data Protection and Encryption

1. **Data Encryption at Rest**:
   ```csharp
   public class DataEncryptionService
   {
       private readonly string _encryptionKey;
       
       public DataEncryptionService(IConfiguration configuration)
       {
           _encryptionKey = configuration["Encryption:Key"];
       }
       
       public string EncryptSensitiveData(string plainText)
       {
           if (string.IsNullOrEmpty(plainText))
               return string.Empty;
           
           using (var aes = Aes.Create())
           {
               aes.Key = Convert.FromBase64String(_encryptionKey);
               aes.GenerateIV();
               
               using (var encryptor = aes.CreateEncryptor())
               using (var msEncrypt = new MemoryStream())
               {
                   msEncrypt.Write(aes.IV, 0, aes.IV.Length);
                   
                   using (var csEncrypt = new CryptoStream(msEncrypt, encryptor, CryptoStreamMode.Write))
                   using (var swEncrypt = new StreamWriter(csEncrypt))
                   {
                       swEncrypt.Write(plainText);
                   }
                   
                   return Convert.ToBase64String(msEncrypt.ToArray());
               }
           }
       }
       
       public string DecryptSensitiveData(string cipherText)
       {
           if (string.IsNullOrEmpty(cipherText))
               return string.Empty;
           
           var fullCipher = Convert.FromBase64String(cipherText);
           
           using (var aes = Aes.Create())
           {
               aes.Key = Convert.FromBase64String(_encryptionKey);
               
               var iv = new byte[aes.BlockSize / 8];
               var cipher = new byte[fullCipher.Length - iv.Length];
               
               Array.Copy(fullCipher, iv, iv.Length);
               Array.Copy(fullCipher, iv.Length, cipher, 0, cipher.Length);
               
               aes.IV = iv;
               
               using (var decryptor = aes.CreateDecryptor())
               using (var msDecrypt = new MemoryStream(cipher))
               using (var csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read))
               using (var srDecrypt = new StreamReader(csDecrypt))
               {
                   return srDecrypt.ReadToEnd();
               }
           }
       }
   }
   ```

2. **Data Encryption in Transit**:
   ```csharp
   public class SecureHttpClientService
   {
       private readonly HttpClient _httpClient;
       
       public SecureHttpClientService()
       {
           var handler = new HttpClientHandler()
           {
               ServerCertificateCustomValidationCallback = (message, cert, chain, errors) =>
               {
                   // Implement certificate validation logic
                   return ValidateCertificate(cert, chain, errors);
               }
           };
           
           _httpClient = new HttpClient(handler);
           _httpClient.DefaultRequestHeaders.Add("User-Agent", "TownePark-DataProduct/1.0");
       }
       
       public async Task<T> SecurePostAsync<T>(string url, object data, string apiKey)
       {
           var json = JsonSerializer.Serialize(data);
           var content = new StringContent(json, Encoding.UTF8, "application/json");
           
           _httpClient.DefaultRequestHeaders.Authorization = 
               new AuthenticationHeaderValue("Bearer", apiKey);
           
           var response = await _httpClient.PostAsync(url, content);
           response.EnsureSuccessStatusCode();
           
           var responseContent = await response.Content.ReadAsStringAsync();
           return JsonSerializer.Deserialize<T>(responseContent);
       }
   }
   ```

### Testing Phase

#### Security Testing Standards

#### Static Application Security Testing (SAST)
1. **Code Analysis Tools**:
   - SonarQube Security Rules
   - Veracode Static Analysis
   - Checkmarx CxSAST
   - Microsoft Security Code Analysis

2. **Security Code Review Checklist**:
   ```
   Authentication & Authorization:
   [ ] Proper authentication mechanisms implemented
   [ ] Authorization checks on all protected resources
   [ ] Session management properly implemented
   [ ] Password policies enforced
   
   Input Validation:
   [ ] All inputs validated on server side
   [ ] SQL injection prevention implemented
   [ ] XSS prevention measures in place
   [ ] File upload security controls
   
   Data Protection:
   [ ] Sensitive data encrypted at rest
   [ ] Secure communication channels (HTTPS/TLS)
   [ ] Proper key management
   [ ] Data masking for non-production environments
   
   Error Handling:
   [ ] No sensitive information in error messages
   [ ] Proper logging of security events
   [ ] Graceful error handling
   [ ] Security monitoring and alerting
   ```

#### Dynamic Application Security Testing (DAST)
1. **Automated Security Scanning**:
   ```yaml
   # Security testing pipeline
   security_tests:
     runs-on: ubuntu-latest
     steps:
       - name: Checkout code
         uses: actions/checkout@v2
       
       - name: OWASP ZAP Baseline Scan
         uses: zaproxy/action-baseline@v0.4.0
         with:
           target: 'https://staging.townepark.com'
           rules_file_name: '.zap/rules.tsv'
           cmd_options: '-a'
       
       - name: Nikto Web Scanner
         run: |
           nikto -h https://staging.townepark.com -Format xml -output nikto-results.xml
       
       - name: SSL Labs Test
         run: |
           sslyze --regular staging.townepark.com:443
   ```

2. **Penetration Testing**:
   - Quarterly external penetration testing
   - Annual internal penetration testing
   - Red team exercises for critical systems
   - Bug bounty program for continuous testing

#### Security Test Cases
1. **Authentication Testing**:
   ```csharp
   [Test]
   public async Task Login_InvalidCredentials_ReturnsUnauthorized()
   {
       // Arrange
       var loginRequest = new LoginRequest
       {
           Username = "testuser",
           Password = "wrongpassword"
       };
       
       // Act
       var response = await _client.PostAsJsonAsync("/api/auth/login", loginRequest);
       
       // Assert
       Assert.AreEqual(HttpStatusCode.Unauthorized, response.StatusCode);
   }
   
   [Test]
   public async Task AccessProtectedResource_NoToken_ReturnsUnauthorized()
   {
       // Act
       var response = await _client.GetAsync("/api/customer-sites");
       
       // Assert
       Assert.AreEqual(HttpStatusCode.Unauthorized, response.StatusCode);
   }
   ```

2. **Input Validation Testing**:
   ```csharp
   [Test]
   public async Task CreateCustomerSite_SqlInjectionAttempt_ReturnsValidationError()
   {
       // Arrange
       var maliciousInput = new CustomerSite
       {
           CustomerName = "'; DROP TABLE CustomerSites; --",
           SiteAddress = "123 Main St"
       };
       
       // Act
       var response = await _client.PostAsJsonAsync("/api/customer-sites", maliciousInput);
       
       // Assert
       Assert.AreEqual(HttpStatusCode.BadRequest, response.StatusCode);
   }
   ```

### Deployment Phase

#### Secure Deployment Practices

#### Infrastructure Security
1. **Container Security**:
   ```dockerfile
   # Secure Dockerfile example
   FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
   
   # Create non-root user
   RUN addgroup --system --gid 1001 appgroup
   RUN adduser --system --uid 1001 --gid 1001 appuser
   
   # Set working directory
   WORKDIR /app
   EXPOSE 80
   EXPOSE 443
   
   FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
   WORKDIR /src
   COPY ["TownePark.DataProduct.csproj", "."]
   RUN dotnet restore "TownePark.DataProduct.csproj"
   COPY . .
   RUN dotnet build "TownePark.DataProduct.csproj" -c Release -o /app/build
   
   FROM build AS publish
   RUN dotnet publish "TownePark.DataProduct.csproj" -c Release -o /app/publish
   
   FROM base AS final
   WORKDIR /app
   COPY --from=publish /app/publish .
   
   # Switch to non-root user
   USER appuser
   
   ENTRYPOINT ["dotnet", "TownePark.DataProduct.dll"]
   ```

2. **Kubernetes Security**:
   ```yaml
   apiVersion: v1
   kind: Pod
   metadata:
     name: townepark-dataproduct
   spec:
     securityContext:
       runAsNonRoot: true
       runAsUser: 1001
       fsGroup: 1001
     containers:
     - name: app
       image: townepark/dataproduct:latest
       securityContext:
         allowPrivilegeEscalation: false
         readOnlyRootFilesystem: true
         capabilities:
           drop:
           - ALL
       resources:
         limits:
           memory: "512Mi"
           cpu: "500m"
         requests:
           memory: "256Mi"
           cpu: "250m"
   ```

#### Configuration Security
1. **Secure Configuration Management**:
   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "#{ConnectionString}#"
     },
     "Jwt": {
       "SecretKey": "#{JwtSecretKey}#",
       "Issuer": "#{JwtIssuer}#",
       "Audience": "#{JwtAudience}#"
     },
     "Encryption": {
       "Key": "#{EncryptionKey}#"
     },
     "Logging": {
       "LogLevel": {
         "Default": "Information",
         "Microsoft": "Warning",
         "Microsoft.Hosting.Lifetime": "Information"
       }
     }
   }
   ```

2. **Environment-Specific Security**:
   ```csharp
   public void ConfigureServices(IServiceCollection services)
   {
       // Security headers
       services.AddHsts(options =>
       {
           options.Preload = true;
           options.IncludeSubDomains = true;
           options.MaxAge = TimeSpan.FromDays(365);
       });
       
       // CORS policy
       services.AddCors(options =>
       {
           options.AddPolicy("ProductionPolicy", builder =>
           {
               builder.WithOrigins("https://app.townepark.com")
                      .AllowAnyMethod()
                      .AllowAnyHeader()
                      .AllowCredentials();
           });
       });
       
       // Rate limiting
       services.AddRateLimiter(options =>
       {
           options.AddFixedWindowLimiter("ApiPolicy", limiterOptions =>
           {
               limiterOptions.PermitLimit = 100;
               limiterOptions.Window = TimeSpan.FromMinutes(1);
           });
       });
   }
   ```

### Maintenance Phase

#### Security Monitoring and Incident Response

#### Security Monitoring
1. **Application Security Monitoring**:
   ```csharp
   public class SecurityEventLogger
   {
       private readonly ILogger<SecurityEventLogger> _logger;
       
       public SecurityEventLogger(ILogger<SecurityEventLogger> logger)
       {
           _logger = logger;
       }
       
       public void LogAuthenticationFailure(string username, string ipAddress)
       {
           _logger.LogWarning("Authentication failure for user {Username} from IP {IpAddress}", 
               username, ipAddress);
       }
       
       public void LogUnauthorizedAccess(string username, string resource, string action)
       {
           _logger.LogWarning("Unauthorized access attempt by {Username} to {Resource} for {Action}", 
               username, resource, action);
       }
       
       public void LogSuspiciousActivity(string activity, string details)
       {
           _logger.LogError("Suspicious activity detected: {Activity}. Details: {Details}", 
               activity, details);
       }
   }
   ```

2. **Security Metrics and Alerting**:
   ```csharp
   public class SecurityMetrics
   {
       private readonly IMetricsCollector _metrics;
       
       public SecurityMetrics(IMetricsCollector metrics)
       {
           _metrics = metrics;
       }
       
       public void RecordAuthenticationAttempt(bool successful)
       {
           _metrics.Counter("authentication_attempts_total")
                   .WithTag("result", successful ? "success" : "failure")
                   .Increment();
       }
       
       public void RecordSecurityViolation(string violationType)
       {
           _metrics.Counter("security_violations_total")
                   .WithTag("type", violationType)
                   .Increment();
       }
   }
   ```

#### Vulnerability Management
1. **Dependency Scanning**:
   ```yaml
   # GitHub Actions workflow for dependency scanning
   name: Security Scan
   on:
     push:
       branches: [ main, develop ]
     pull_request:
       branches: [ main ]
   
   jobs:
     security-scan:
       runs-on: ubuntu-latest
       steps:
       - uses: actions/checkout@v2
       
       - name: Run Snyk to check for vulnerabilities
         uses: snyk/actions/dotnet@master
         env:
           SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
         with:
           args: --severity-threshold=high
       
       - name: OWASP Dependency Check
         uses: dependency-check/Dependency-Check_Action@main
         with:
           project: 'TownePark-DataProduct'
           path: '.'
           format: 'ALL'
   ```

2. **Security Patch Management**:
   ```csharp
   // Automated security update process
   public class SecurityUpdateService
   {
       public async Task CheckForSecurityUpdatesAsync()
       {
           var vulnerabilities = await _vulnerabilityScanner.ScanAsync();
           
           foreach (var vulnerability in vulnerabilities.Where(v => v.Severity >= Severity.High))
           {
               await NotifySecurityTeamAsync(vulnerability);
               
               if (vulnerability.HasAvailablePatch)
               {
                   await SchedulePatchDeploymentAsync(vulnerability);
               }
           }
       }
   }
   ```

## Security Training and Awareness

### Developer Security Training

#### Mandatory Training Programs
1. **Secure Coding Fundamentals**:
   - OWASP Top 10 vulnerabilities
   - Input validation and sanitization
   - Authentication and authorization
   - Cryptography and data protection

2. **Platform-Specific Security**:
   - .NET security best practices
   - JavaScript/TypeScript security
   - Database security (SQL Server)
   - Cloud security (Azure)

3. **Security Tools Training**:
   - Static analysis tools usage
   - Dynamic testing tools
   - Security monitoring and logging
   - Incident response procedures

#### Continuous Learning
1. **Security Champions Program**:
   - Designated security advocates in each team
   - Regular security training and updates
   - Peer-to-peer knowledge sharing
   - Security code review leadership

2. **Security Awareness Activities**:
   - Monthly security newsletters
   - Quarterly security workshops
   - Annual security conferences
   - Capture-the-flag competitions

### Security Compliance and Auditing

#### Compliance Monitoring
1. **Automated Compliance Checks**:
   ```csharp
   public class ComplianceChecker
   {
       public async Task<ComplianceReport> RunComplianceCheckAsync()
       {
           var report = new ComplianceReport();
           
           // Check password policy compliance
           report.PasswordPolicyCompliance = await CheckPasswordPolicyAsync();
           
           // Check encryption compliance
           report.EncryptionCompliance = await CheckEncryptionComplianceAsync();
           
           // Check access control compliance
           report.AccessControlCompliance = await CheckAccessControlAsync();
           
           // Check audit logging compliance
           report.AuditLoggingCompliance = await CheckAuditLoggingAsync();
           
           return report;
       }
   }
   ```

2. **Regular Security Audits**:
   - Monthly automated security scans
   - Quarterly manual security reviews
   - Annual third-party security assessments
   - Continuous compliance monitoring

This comprehensive development security standards framework ensures that security is integrated throughout the entire development lifecycle, protecting Towne Park's data, systems, and business operations while maintaining compliance with regulatory requirements and industry best practices.