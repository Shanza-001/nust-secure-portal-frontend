const suspiciousKeywords = [
    "urgent",
    "verify your account",
    "click here",
    "password expires",
    "update your information",
    "your account will be closed",
    "suspended",
    "lottery",
    "win",
    "prize",
  ];
  
  const suspiciousDomains = [
    ".xyz",
    ".click",
    ".top",
    ".info",
    ".loan",
    ".quest",
    ".vip",
    ".support",
  ];
  
  export const analyzePhishingRisk = (textOrEmail) => {
    const text = textOrEmail.toLowerCase();
  
    let score = 0;
    const reasons = [];
  
    suspiciousKeywords.forEach((kw) => {
      if (text.includes(kw)) {
        score += 2;
        reasons.push(`Contains suspicious phrase: "${kw}"`);
      }
    });
  
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const urls = text.match(urlRegex) || [];
  
    urls.forEach((url) => {
      const lowerUrl = url.toLowerCase();
  
      if (!lowerUrl.startsWith("https://")) {
        score += 2;
        reasons.push(`URL not using HTTPS: ${url}`);
      }
  
      suspiciousDomains.forEach((sd) => {
        if (lowerUrl.endsWith(sd) || lowerUrl.includes(sd + "/")) {
          score += 2;
          reasons.push(`Suspicious domain extension (${sd}) in URL: ${url}`);
        }
      });
  
      if (lowerUrl.includes("@") && lowerUrl.split("@")[1].length < 6) {
        score += 1;
        reasons.push(`URL contains strange email-like pattern: ${url}`);
      }
    });
  
    if (text.includes("password") && text.includes("reset")) {
      score += 2;
      reasons.push("Mentions password reset.");
    }
  
    if (text.includes("bank") || text.includes("payment")) {
      score += 1;
      reasons.push("Mentions financial-related terms.");
    }
  
    let riskLabel = "Likely Legitimate";
    if (score >= 8) riskLabel = "Highly Likely Phishing";
    else if (score >= 4) riskLabel = "Possibly Phishing";
  
    return {
      score,
      riskLabel,
      reasons,
      urls,
    };
  };