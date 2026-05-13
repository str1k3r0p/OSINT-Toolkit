// --- Global Variables and OSINT Configuration ---

const bugBountyCategories = [
    {
        name: "Admin & Login Pages",
        icon: "fas fa-user-lock",
        dorks: [
            "site:{domain} inurl:admin", "site:{domain} inurl:login", "site:{domain} inurl:dashboard", "site:{domain} inurl:wp-admin", "site:{domain} inurl:controlpanel", "site:{domain} inurl:adminpanel", "site:{domain} inurl:administrator", "site:{domain} inurl:moderator", "site:{domain} inurl:webadmin", "site:{domain} inurl:backoffice", "site:{domain} inurl:backend", "site:{domain} inurl:auth", "site:{domain} inurl:portal", "site:{domain} inurl:staff", "site:{domain} inurl:manage"
        ]
    },
    {
        name: "Sensitive Information",
        icon: "fas fa-key",
        dorks: [
            "site:{domain} \"password\"", "site:{domain} \"config\"", "site:{domain} \"credentials\"", "site:{domain} \"secret\"", "site:{domain} \"api_key\"", "site:{domain} \"private key\"", "site:{domain} \"client_secret\"", "site:{domain} \"access_token\"", "site:{domain} \"dbpassword\"", "site:{domain} \"authorize\"", "site:{domain} \"confidential\"", "site:{domain} \"ssh key\"", "site:{domain} \"passwd\"", "site:{domain} \"authorization_bearer\"", "site:{domain} \"auth_token\"", "site:{domain} \"oauth_token\"", "site:{domain} \"token\"", "site:{domain} \"refresh_token\""
        ]
    },
    {
        name: "File Types & Documents",
        icon: "fas fa-file-alt",
        dorks: [
            "site:{domain} filetype:pdf", "site:{domain} filetype:doc OR filetype:docx", "site:{domain} filetype:xls OR filetype:xlsx", "site:{domain} filetype:ppt OR filetype:pptx", "site:{domain} filetype:txt", "site:{domain} filetype:csv", "site:{domain} filetype:zip OR filetype:rar OR filetype:tar OR filetype:gz", "site:{domain} filetype:sql", "site:{domain} filetype:bak", "site:{domain} filetype:log", "site:{domain} filetype:xml", "site:{domain} filetype:json", "site:{domain} filetype:env", "site:{domain} filetype:conf", "site:{domain} filetype:yaml OR filetype:yml", "site:{domain} filetype:rsa OR filetype:pem OR filetype:key", "site:{domain} filetype:svg", "site:{domain} filetype:jsp OR filetype:asp OR filetype:aspx OR filetype:php"
        ]
    },
    {
        name: "Directory & File Exposure",
        icon: "fas fa-folder-open",
        dorks: [
            "site:{domain} intitle:\"index of\"", "site:{domain} inurl:ftp", "site:{domain} inurl:uploads", "site:{domain} intext:\"Index of /\"", "site:{domain} intitle:\"Directory Listing For\"", "site:{domain} intext:\"Parent Directory\"", "site:{domain} intitle:\"Index of\" intext:\".env\"", "site:{domain} intitle:\"Index of\" intext:\"config.php\"", "site:{domain} intitle:\"Index of\" intext:\"credentials\"", "site:{domain} intitle:\"Index of /backup\"", "site:{domain} intitle:\"Index of /admin\"", "site:{domain} intitle:\"Index of /config\"", "site:{domain} intitle:\"Index of /database\"", "site:{domain} intitle:\"Index of /password\"", "site:{domain} intitle:\"Index of /private\"", "site:{domain} intitle:\"Index of /wp-content/\"", "site:{domain} intitle:\"Index of /download\"", "site:{domain} intitle:\"Index of /logs\""
        ]
    },
    {
        name: "Configuration Files",
        icon: "fas fa-cogs",
        dorks: [
            "site:{domain} \"config.php\"", "site:{domain} \"settings.py\"", "site:{domain} \"database.yml\"", "site:{domain} \"web.config\"", "site:{domain} inurl:\".env\"", "site:{domain} inurl:\"wp-config.php\"", "site:{domain} inurl:\"configuration.php\"", "site:{domain} inurl:\"settings.json\"", "site:{domain} inurl:\"config.json\"", "site:{domain} inurl:\"application.yaml\"", "site:{domain} inurl:\"config.inc.php\"", "site:{domain} inurl:\"configuration.xml\"", "site:{domain} inurl:\"app.config\"", "site:{domain} inurl:\"application.properties\"", "site:{domain} inurl:\"appsettings.json\"", "site:{domain} inurl:\".npmrc\" OR inurl:\".yarnrc\"", "site:{domain} inurl:\"docker-compose.yml\"", "site:{domain} inurl:\"Dockerfile\""
        ]
    },
    {
        name: "API & GraphQL Endpoints",
        icon: "fas fa-plug",
        dorks: [
            "site:{domain} inurl:api | site:*/rest | site:*/v1 | site:*/v2 | site:*/v3", "site:{domain} intext:\"api documentation\"", "site:{domain} inurl:swagger | inurl:api-docs", "site:{domain} inurl:api/admin", "site:{domain} inurl:api/users", "site:{domain} inurl:api/auth", "site:{domain} inurl:graphql", "site:{domain} inurl:api.php", "site:{domain} inurl:api/v1/auth", "site:{domain} inurl:graphiql", "site:{domain} inurl:graphql.php", "site:{domain} inurl:graphql/console", "site:{domain} \"query {\" \"__schema\"", "site:{domain} intitle:\"GraphiQL\"", "site:{domain} inurl:playground", "site:{domain} inurl:api/token", "site:{domain} inurl:api/v1/user", "site:{domain} inurl:api/data", "site:{domain} inurl:api/password/reset", "site:{domain} inurl:graphql intext:\"query\" intext:\"mutation\""
        ]
    },
    {
        name: "Authentication Issues",
        icon: "fas fa-unlock-alt",
        dorks: [
            "site:{domain} intext:\"jwt token\"", "site:{domain} intext:\"Bearer eyJ\"", "site:{domain} intext:\"Authorization: Bearer\"", "site:{domain} inurl:jwt", "site:{domain} inurl:callback", "site:{domain} inurl:oauth/authorize", "site:{domain} inurl:redirect_uri", "site:{domain} inurl:return_to", "site:{domain} inurl:oauth/token", "site:{domain} inurl:client_id", "site:{domain} inurl:response_type=token", "site:{domain} inurl:saml", "site:{domain} inurl:openid", "site:{domain} inurl:authorize", "site:{domain} inurl:auth/callback", "site:{domain} inurl:sso", "site:{domain} inurl:forgot-password", "site:{domain} inurl:reset", "site:{domain} inurl:verify", "site:{domain} inurl:2fa"
        ]
    },
    {
        name: "CORS & Header Issues",
        icon: "fas fa-exchange-alt",
        dorks: [
            "site:{domain} intext:\"Access-Control-Allow-Origin: *\"", "site:{domain} intext:\"Access-Control-Allow-Credentials: true\"", "site:{domain} intext:\"crossorigin\"", "site:{domain} intext:\"X-XSS-Protection: 0\"", "site:{domain} intext:\"Content-Security-Policy\"", "site:{domain} intext:\"X-Frame-Options: DENY\"", "site:{domain} intext:\"Strict-Transport-Security\"", "site:{domain} intext:\"Access-Control-Expose-Headers\"", "site:{domain} intext:\"X-Content-Type-Options\""
        ]
    },
    {
        name: "Cloud Storage & Misconfig",
        icon: "fas fa-cloud",
        dorks: [
            "site:s3.amazonaws.com \"{domain}\"", "site:blob.core.windows.net \"{domain}\"", "site:googleapis.com \"{domain}\"", "site:drive.google.com \"{domain}\"", "site:dev.azure.com \"{domain}\"", "site:onedrive.live.com \"{domain}\"", "site:digitaloceanspaces.com \"{domain}\"", "site:sharepoint.com \"{domain}\"", "site:s3-external-1.amazonaws.com \"{domain}\"", "site:s3.dualstack.us-east-1.amazonaws.com \"{domain}\"", "site:dropbox.com/s \"{domain}\"", "site:box.com/s \"{domain}\"", "site:docs.google.com inurl:\"/d/\" \"{domain}\"", "site:storage.googleapis.com \"{domain}\"", "site:amazonaws.com intext:\"{domain}\"", "site:firebasestorage.googleapis.com \"{domain}\"", "site:firebase.io \"{domain}\"", "site:firebaseio.com \"{domain}\"", "site:\"{domain}\".s3.amazonaws.com", "site:storage.cloud.google.com \"{domain}\"", "site:azurewebsites.net \"{domain}\"", "site:cloudfront.net \"{domain}\""
        ]
    },
    {
        name: "WebSockets & Mobile APIs",
        icon: "fas fa-mobile-alt",
        dorks: [
            "site:{domain} inurl:websocket", "site:{domain} inurl:socket.io", "site:{domain} intext:\"ws://\"", "site:{domain} intext:\"wss://\"", "site:{domain} \"WebSocket connection\"", "site:{domain} intext:\"mobile api\"", "site:{domain} inurl:api/mobile", "site:{domain} inurl:mobileapi", "site:{domain} inurl:app/api", "site:{domain} inurl:mobile/api", "site:{domain} inurl:api/app", "site:{domain} inurl:app/v1", "site:{domain} inurl:mobile/v1", "site:{domain} inurl:app.json", "site:{domain} inurl:api/ios", "site:{domain} inurl:api/android"
        ]
    },
    {
        name: "SSRF Vulnerable Params",
        icon: "fas fa-random",
        dorks: [
            "inurl:http | inurl:url= | inurl:path= | inurl:dest= | inurl:html= | inurl:data= | inurl:domain= | inurl:page= inurl:& site:{domain}", "inurl:proxy | inurl:fetch | inurl:process | inurl:pull | inurl:retrieve inurl:& site:{domain}", "inurl:go | inurl:redirect | inurl:return | inurl:src | inurl:source | inurl:u | inurl:uri | inurl:url inurl:& site:{domain}", "inurl:window | inurl:next | inurl:target | inurl:rurl | inurl:dest inurl:& site:{domain}", "inurl:api inurl:fetch inurl:& site:{domain}", "inurl:load= inurl:& site:{domain}", "inurl:file= inurl:& site:{domain}", "inurl:resource= inurl:& site:{domain}", "inurl:host= inurl:& site:{domain}", "inurl:preview= inurl:& site:{domain}", "inurl:view= inurl:& site:{domain}", "inurl:validate= inurl:& site:{domain}"
        ]
    },
    {
        name: "XSS Vulnerable Params",
        icon: "fas fa-code",
        dorks: [
            "inurl:q= | inurl:s= | inurl:search= | inurl:query= | inurl:keyword= | inurl:lang= inurl:& site:{domain}", "inurl:msg= | inurl:text= | inurl:error= | inurl:title= | inurl:description= | inurl:content= inurl:& site:{domain}", "inurl:name= | inurl:message= | inurl:body= | inurl:feedback= inurl:& site:{domain}", "inurl:alert= inurl:& site:{domain}", "inurl:caption= inurl:& site:{domain}", "inurl:html= inurl:& site:{domain}", "inurl:comment= inurl:& site:{domain}", "inurl:subject= inurl:& site:{domain}", "inurl:callback= inurl:& site:{domain}", "inurl:redirect= inurl:& site:{domain}", "inurl:return= inurl:& site:{domain}", "inurl:next= inurl:& site:{domain}"
        ]
    },
    {
        name: "SQL Injection Params",
        icon: "fas fa-database",
        dorks: [
            "inurl:id= | inurl:pid= | inurl:category= | inurl:cat= | inurl:action= | inurl:sid= | inurl:dir= inurl:& site:{domain}", "inurl:user= | inurl:uid= | inurl:article= | inurl:item= | inurl:page_id= inurl:& site:{domain}", "inurl:view= | inurl:product= | inurl:news= | inurl:file= | inurl:type= inurl:& site:{domain}", "inurl:tracking= inurl:& site:{domain}", "inurl:ref= inurl:& site:{domain}", "inurl:orderid= inurl:& site:{domain}", "inurl:cartid= inurl:& site:{domain}", "inurl:content= inurl:& site:{domain}", "inurl:section= inurl:& site:{domain}", "inurl:index.php?id= site:{domain}", "inurl:gallery.php?id= site:{domain}", "inurl:products.php?id= site:{domain}"
        ]
    },
    {
        name: "RCE Vulnerable Params",
        icon: "fas fa-terminal",
        dorks: [
            "inurl:cmd | inurl:exec= | inurl:query= | inurl:code= | inurl:do= | inurl:run= | inurl:read= | inurl:ping= inurl:& site:{domain}", "inurl:system= | inurl:os= | inurl:execute= | inurl:shell= | inurl:download= inurl:& site:{domain}", "inurl:eval= | inurl:command= | inurl:execute= | inurl:script= | inurl:payload= inurl:& site:{domain}", "inurl:bash= inurl:& site:{domain}", "inurl:nslookup= inurl:& site:{domain}", "inurl:phpinfo= inurl:& site:{domain}", "inurl:proc= inurl:& site:{domain}", "inurl:curl= inurl:& site:{domain}", "inurl:wget= inurl:& site:{domain}", "inurl:whoami= inurl:& site:{domain}", "inurl:nc= inurl:& site:{domain}"
        ]
    },
    {
        name: "Template Injection",
        icon: "fas fa-file-code",
        dorks: [
            "site:{domain} intext:\"{{'7'*7}}\"", "site:{domain} intext:\"${7*7}\"", "site:{domain} intext:\"{{7*7}}\"", "site:{domain} intext:\"<%= 7*7 %>\"", "site:{domain} intext:\"#{7*7}\"", "site:{domain} intext:\"{{''.constructor.constructor}}\"", "site:{domain} intext:\"{{config.items()}}\"", "site:{domain} intext:\"{{request}}\"", "site:{domain} intext:\"{{self}}\"", "site:{domain} intext:\"{{config}}\"", "site:{domain} intext:\"{{request.application.__globals__}}\"", "site:{domain} intext:\"{{request.__class__}}\"", "site:{domain} intext:\"${}\"", "site:{domain} intext:\"th:text\""
        ]
    },
    {
        name: "DevOps & Infrastructure",
        icon: "fas fa-server",
        dorks: [
            "site:{domain} inurl:nagios", "site:{domain} inurl:zabbix", "site:{domain} inurl:prometheus", "site:{domain} inurl:grafana", "site:{domain} inurl:kibana", "site:{domain} inurl:splunk", "site:{domain} inurl:elasticsearch", "site:{domain} inurl:monitor", "site:{domain} inurl:jenkins", "site:{domain} inurl:travis", "site:{domain} inurl:circleci", "site:{domain} inurl:bamboo", "site:{domain} inurl:gitlab-ci", "site:{domain} inurl:drone", "site:{domain} intext:\"pipeline\"", "site:{domain} inurl:.git", "site:{domain} inurl:.git/HEAD", "site:{domain} inurl:.git/config", "site:{domain} intext:\"Index of /.git\"", "site:{domain} filetype:git", "site:{domain} inurl:kubernetes", "site:{domain} inurl:rancher", "site:{domain} inurl:docker", "site:{domain} inurl:swarm", "site:{domain} inurl:portainer", "site:{domain} inurl:sonarqube", "site:{domain} inurl:phabricator", "site:{domain} inurl:jira", "site:{domain} inurl:confluence"
        ]
    },
    {
        name: "Authentication Bypasses",
        icon: "fas fa-user-ninja", 
        dorks: [
            "site:{domain} inurl:debug=true", "site:{domain} inurl:test=true", "site:{domain} inurl:dev=true", "site:{domain} inurl:development=true", "site:{domain} inurl:bypass=true", "site:{domain} inurl:local=true", "site:{domain} inurl:staging=true", "site:{domain} inurl:backdoor", "site:{domain} inurl:auth=skip", "site:{domain} inurl:auth=false", "site:{domain} inurl:admin=true", "site:{domain} inurl:show_err=true", "site:{domain} inurl:debug_mode=true", "site:{domain} inurl:debug_level", "site:{domain} inurl:testing=true", "site:{domain} inurl:dev_mode=true", "site:{domain} inurl:access=all", "site:{domain} inurl:root=true", "site:{domain} inurl:demo_mode=true", "site:{domain} inurl:sample=true"
        ]
    },
    {
        name: "Open Redirects",
        icon: "fas fa-external-link-alt",
        dorks: [
            "site:{domain} inurl:redirect", "site:{domain} inurl:return", "site:{domain} inurl:r=http", "site:{domain} inurl:url=http", "site:{domain} inurl:next=http", "site:{domain} inurl:continue=http", "site:{domain} inurl:returnto=http", "site:{domain} inurl:goto=http", "site:{domain} inurl:link=http", "site:{domain} inurl:to=http", "site:{domain} inurl:out=http", "site:{domain} inurl:view=http", "site:{domain} inurl:location=http", "site:{domain} inurl:path=http", "site:{domain} inurl:uri=http"
        ]
    },
    {
        name: "Development & Hidden",
        icon: "fas fa-code-branch",
        dorks: [
            "site:{domain} inurl:beta", "site:{domain} inurl:hidden", "site:{domain} inurl:unreleased", "site:{domain} inurl:upcoming", "site:{domain} inurl:draft", "site:{domain} inurl:private", "site:{domain} inurl:preview", "site:{domain} inurl:testing", "site:{domain} inurl:dev", "site:{domain} inurl:develop", "site:{domain} inurl:development", "site:{domain} inurl:stage", "site:{domain} inurl:staging", "site:{domain} inurl:preprod", "site:{domain} inurl:prototype", "site:{domain} inurl:internal", "site:{domain} inurl:test", "site:{domain} inurl:debug", "site:{domain} inurl:local", "site:{domain} inurl:sandbox"
        ]
    },
    {
        name: "CMS & Framework",
        icon: "fas fa-th", 
        dorks: [
            "site:{domain} inurl:wp-admin", "site:{domain} inurl:wp-content", "site:{domain} inurl:wp-includes", "site:{domain} inurl:wp-json", "site:{domain} inurl:/wp-admin/admin-ajax.php", "site:{domain} intext:\"Powered by\" & intext:Drupal & inurl:user", "site:{domain} inurl:*/joomla/login", "site:{domain} inurl:administrator/index.php", "site:{domain} inurl:typo3", "site:{domain} inurl:magento", "site:{domain} inurl:admin/Cms_Wysiwyg/directive/", "site:{domain} inurl:shopify", "site:{domain} inurl:laravel", "site:{domain} inurl:symfony", "site:{domain} inurl:django", "site:{domain} inurl:flask", "site:{domain} inurl:rails", "site:{domain} inurl:spring", "site:{domain} inurl:struts", "site:{domain} inurl:node_modules", "site:{domain} inurl:package.json", "site:{domain} inurl:composer.json"
        ]
    },
    {
        name: "Security Misconfigurations",
        icon: "fas fa-shield-virus", 
        dorks: [
            "site:{domain} intext:\"Content-Security-Policy\"", "site:{domain} intext:\"unsafe-inline\"", "site:{domain} intext:\"unsafe-eval\"", "site:{domain} intext:\"script-src 'self'\"", "site:{domain} intext:\"style-src 'unsafe-inline'\"", "site:{domain} inurl:server-status", "site:{domain} inurl:status?full=true", "site:{domain} inurl:phpmyadmin", "site:{domain} inurl:adminer", "site:{domain} inurl:phpinfo", "site:{domain} inurl:info.php", "site:{domain} \"You have an error in your SQL syntax\"", "site:{domain} \"Warning: mysql_connect()\"", "site:{domain} \"Fatal error:\"", "site:{domain} \"Exception in thread \"main\"\"", "site:{domain} intext:\"syntax error at line\""
        ]
    },
    {
        name: "New & Advanced Dorks",
        icon: "fas fa-rocket",
        dorks: [
            "site:{domain} inurl:api/graphql", "site:{domain} inurl:api/gql", "site:{domain} inurl:\".well-known/security.txt\"", "site:{domain} inurl:sourcemaps", "site:{domain} inurl:\".map\"", "site:{domain} inurl:swagger.json", "site:{domain} inurl:api-docs.json", "site:{domain} inurl:kubernetes.io/dockerconfigjson", "site:{domain} inurl:traefik", "site:{domain} inurl:terraform.tfstate", "site:{domain} inurl:\".git/refs/heads\"", "site:{domain} inurl:\".env.local\"", "site:{domain} intext:\"Web.config file\"", "site:{domain} inurl:composer.lock", "site:{domain} inurl:yarn.lock", "site:{domain} inurl:package-lock.json", "site:{domain} inurl:Pipfile.lock", "site:{domain} inurl:Gemfile.lock", "site:{domain} inurl:\"/.netlify/\"", "site:{domain} inurl:\".vscode/\"", "site:{domain} inurl:\".idea/\"", "site:{domain} inurl:\"/.circleci/\"", "site:{domain} inurl:\"/.github/\""
        ]
    },
    {
        name: "Subdomain Takeover Probes",
        icon: "fas fa-unlink",
        dorks: [
            "site:*.{domain} \"this shop is currently unavailable\"", 
            "site:*.{domain} \"The specified bucket does not exist\"", 
            "site:*.{domain} \"NoSuchBucket\"", 
            "site:*.{domain} \"You're Almost There!\"", 
            "site:*.{domain} \"herokucdn.com/error-pages/no-such-app.html\"", 
            "site:*.{domain} \"There isn't a GitHub Pages site here.\"", 
            "site:*.{domain} \"Sorry, this shop is currently unavailable.\"", 
            "site:*.{domain} \"Fastly error: unknown domain\"", 
            "site:*.{domain} \"The page you are looking for does not exist.\"", 
            "site:*.{domain} \"If you're the owner of this website: Contact your hosting provider.\"", 
            "site:*.{domain} \"Repository not found\"", 
            "site:*.{domain} \"Whatever you were looking for doesn't currently exist at this address.\"", 
            "site:*.{domain} \"Oops. We couldn't find that page.\"", 
            "site:*.{domain} \"This Amazon S3 bucket is not configured as a website.\""
        ]
    },
    {
        name: "Exposed Tech Panels & Dashboards",
        icon: "fas fa-window-restore",
        dorks: [
            "site:{domain} intitle:\"phpMyAdmin\" inurl:phpmyadmin",
            "site:{domain} intitle:\"Adminer\" inurl:adminer.php",
            "site:{domain} intitle:\"pgAdmin\" inurl:pgadmin",
            "site:{domain} intitle:\"RabbitMQ Management\"",
            "site:{domain} intitle:\"Flower\" inurl:flower", 
            "site:{domain} intitle:\"Portainer\" inurl:portainer",
            "site:{domain} intitle:\"Rancher\" inurl:rancher",
            "site:{domain} intitle:\"Kubernetes Dashboard\"",
            "site:{domain} intitle:\"Jenkins\" inurl:jenkins",
            "site:{domain} intitle:\"GitLab\" inurl:users/sign_in",
            "site:{domain} intitle:\"Nexus Repository Manager\"",
            "site:{domain} intitle:\"Apache Tomcat\"",
            "site:{domain} intitle:\"JBoss Management Console\"",
            "site:{domain} intitle:\"Webmin\" inurl:8000 OR inurl:10000",
            "site:{domain} intitle:\"cPanel\" inurl:2082 OR inurl:2083",
            "site:{domain} intitle:\"Plesk\" inurl:8443 OR inurl:8880"
        ]
    },
    {
        name: "Specific Vulnerability Footprints",
        icon: "fas fa-bug-slash", 
        dorks: [
            "site:{domain} intext:\"Log4j\" OR intext:\"Log4Shell\"",
            "site:{domain} inurl:cgi-bin intext:\"Shellshock\"",
            "site:{domain} intext:\"Heartbleed test\"",
            "site:{domain} filetype:swf intext:\"Flash Player version\"",
            "site:{domain} intext:\"Apache Struts\" intitle:\"Welcome\"",
            "site:{domain} intext:\"Microsoft SharePoint\" inurl:_layouts/",
            "site:{domain} intext:\"BIG-IP\" intitle:\"BIG-IP F5\"",
            "site:{domain} inurl:wp-content/plugins/revslider/",
            "site:{domain} inurl:Telerik.Web.UI.WebResource.axd",
            "site:{domain} intext:\"vBulletin\" inurl:showthread.php",
            "site:{domain} intext:\"PHP Version\" intitle:\"phpinfo()\"",
            "site:{domain} intext:\"Pulse Connect Secure\" intitle:\"Login\"",
            "site:{domain} intext:\"Citrix Gateway\" intitle:\"Login\"",
            "site:{domain} intext:\"FortiGate\" OR intext:\"FortiClient\" intitle:\"Login\""
        ]
    }
];

const peopleSearchCategories = [
    {
        name: "General Web Presence",
        icon: "fas fa-globe",
        dorks: [
            "\"{name}\"",
            "\"{name}\" AND \"{location}\"",
            "\"{name}\" AND (developer OR engineer OR \"manager\" OR director OR founder OR ceo)",
            "intitle:\"{name}\" -site:linkedin.com -site:facebook.com",
            "\"{name}\" intitle:\"contact\"",
            "\"{name}\" inurl:about",
            "\"{name}\" intitle:\"portfolio\" OR inurl:portfolio",
            "\"{name}\" AND (\"resume\" OR \"cv\" OR \"curriculum vitae\")"
        ]
    },
    {
        name: "Social Media Footprints",
        icon: "fas fa-hashtag",
        dorks: [
            "site:linkedin.com/in/ \"{name}\"",
            "site:twitter.com \"{name}\"",
            "site:facebook.com \"{name}\"",
            "site:instagram.com \"{name}\"",
            "site:reddit.com \"{name}\"",
            "site:github.com \"{name}\"",
            "site:medium.com \"{name}\"",
            "site:tiktok.com \"{name}\"",
            "site:youtube.com \"{name}\"",
            "site:pinterest.com \"{name}\"",
            "site:tinder.com \"{name}\"",
            "site:linktr.ee \"{name}\"",
            "site:behance.net \"{name}\"",
            "site:dribbble.com \"{name}\""
        ]
    },
    {
        name: "Documents & Leaks",
        icon: "fas fa-file-alt",
        dorks: [
            "site:pastebin.com \"{name}\"",
            "site:controlc.com \"{name}\"",
            "site:scribd.com \"{name}\"",
            "site:slideshare.net \"{name}\"",
            "\"{name}\" ext:pdf",
            "\"{name}\" ext:doc OR ext:docx",
            "\"{name}\" ext:txt",
            "\"{name}\" ext:xls OR ext:xlsx OR ext:csv",
            "\"{name}\" ext:ppt OR ext:pptx",
            "\"{name}\" intext:\"confidential\" OR intext:\"internal\""
        ]
    },
    {
        name: "Public Records & Directories",
        icon: "fas fa-database",
        dorks: [
            "\"{name}\" (voter OR registration OR court OR arrest OR bankruptcy)",
            "\"{name}\" site:truepeoplesearch.com",
            "\"{name}\" site:fastpeoplesearch.com",
            "\"{name}\" site:familytreenow.com",
            "\"{name}\" site:radaris.com",
            "\"{name}\" site:whitepages.com",
            "\"{name}\" site:mylife.com",
            "\"{name}\" site:spokeo.com",
            "\"{name}\" site:advancedbackgroundchecks.com"
        ]
    }
];

const emailSearchCategories = [
    {
        name: "Basic Email Discovery",
        icon: "fas fa-envelope",
        dorks: [
            "\"{email}\"",
            "intext:\"{email}\"",
            "\"{target}\" + \"@gmail.com\" OR \"@yahoo.com\" OR \"@hotmail.com\" OR \"@outlook.com\"",
            "\"{target}\" email OR contact OR \"mail to\"",
            "site:linkedin.com \"{email}\"",
            "site:twitter.com \"{email}\"",
            "site:github.com \"{email}\""
        ]
    },
    {
        name: "Domain Email Exposure",
        icon: "fas fa-at",
        dorks: [
            "\"@{domain}\"",
            "intext:\"@{domain}\" contact OR email OR reach",
            "site:{domain} intext:\"@{domain}\"",
            "site:github.com \"@{domain}\"",
            "site:pastebin.com \"@{domain}\"",
            "site:gitlab.com \"@{domain}\"",
            "site:bitbucket.org \"@{domain}\"",
            "site:stackoverflow.com \"@{domain}\"",
            "\"@{domain}\" ext:txt OR ext:csv OR ext:log OR ext:env OR ext:xls OR ext:xlsx",
            "\"@{domain}\" intext:\"list\" OR intext:\"subscribers\" OR intext:\"members\""
        ]
    },
    {
        name: "Breach & Leak Checks",
        icon: "fas fa-user-secret",
        dorks: [
            "site:pastebin.com \"{email}\"",
            "site:controlc.com \"{email}\"",
            "site:throwbin.io \"{email}\"",
            "site:ghostbin.com \"{email}\"",
            "site:trello.com \"{email}\"",
            "\"{email}\" password OR pwd OR pass",
            "\"{email}\" database OR db OR dump OR leak OR hack OR breached",
            "\"{email}\" ext:sql OR ext:bak"
        ]
    }
];

const imageSearchEngines = [
    {
        name: "General Reverse Search Engines",
        icon: "fas fa-search",
        engines: [
            { name: "Google Images", url: "https://images.google.com/searchbyimage/upload" },
            { name: "Yandex Images (Best for Faces/Locations)", url: "https://yandex.com/images/search?rpt=imageview" },
            { name: "Bing Visual Search", url: "https://www.bing.com/visualsearch" },
            { name: "Baidu Image Search (Best for Asia)", url: "https://graph.baidu.com/pcpage/index?tpl_from=pc" },
            { name: "TinEye (Best for exact matches/modifications)", url: "https://tineye.com/" }
        ]
    },
    {
        name: "Facial Recognition AI",
        icon: "fas fa-user-circle",
        engines: [
            { name: "PimEyes (Premium Facial Search)", url: "https://pimeyes.com/en" },
            { name: "FaceCheck.ID (Criminal/Public DBs)", url: "https://facecheck.id/" },
            { name: "Betaface (Technical Facial Analysis)", url: "https://betaface.com/demo.html" }
        ]
    },
    {
        name: "Metadata & EXIF Data",
        icon: "fas fa-info-circle",
        engines: [
            { name: "Jeffrey's Image Metadata Viewer", url: "http://exif.regex.info/exif.cgi" },
            { name: "Jimpl EXIF Viewer", url: "https://jimpl.com/" },
            { name: "Metapicz", url: "https://metapicz.com/" },
            { name: "ExifData.com", url: "https://exifdata.com/" }
        ]
    },
    {
        name: "Forensics & Manipulation Analysis",
        icon: "fas fa-microscope",
        engines: [
            { name: "FotoForensics (Error Level Analysis - ELA)", url: "http://fotoforensics.com/" },
            { name: "Forensically (Clone Detection/Noise Analysis)", url: "https://29a.ch/photo-forensics/#forensic-magnifier" },
            { name: "Image Edited? (Quick manipulation check)", url: "https://imageedited.com/" },
            { name: "Aperisolve (Steganography / Hidden Data)", url: "https://www.aperisolve.com/" }
        ]
    },
    {
        name: "Geolocation & Satellite",
        icon: "fas fa-globe-americas",
        engines: [
            { name: "Google Earth Web", url: "https://earth.google.com/web/" },
            { name: "Sentinel Hub (Historical Satellite Imagery)", url: "https://apps.sentinel-hub.com/eo-browser/" },
            { name: "SunCalc (Calculate time based on shadows)", url: "https://www.suncalc.org/" },
            { name: "Overpass Turbo (Search OSM for matching landmarks)", url: "https://overpass-turbo.eu/" }
        ]
    }
];