export function friendlyApiError(data, fallback) {
  if (!data?.error) return fallback;
  switch (data.error) {
    case 'INVALID_API_KEY':
      return 'That API key was not recognised.';
    case 'MISSING_TENANT_CONTEXT':
      return 'Sign in to continue.';
    case 'ORIGIN_INVALID':
      return 'One or more origins are invalid. Use scheme://host[:port] with no path or wildcard.';
    case 'APPEARANCE_INVALID':
      return 'One or more appearance values are invalid.';
    case 'WEBHOOK_INVALID':
      return 'That webhook URL could not be validated.';
    case 'WEBHOOK_BLOCKED_ADDRESS':
      return 'That webhook address is not allowed.';
    case 'WEBHOOK_REQUIRES_PRO':
      return 'Webhooks are available on Pro and Agency tiers.';
    case 'QUOTA_EXCEEDED':
      return 'This upload would exceed the tenant’s document quota.';
    case 'UNPARSEABLE_DOCUMENT':
      return 'That document could not be parsed.';
    case 'UNSUPPORTED_MEDIA_TYPE':
      return 'Only PDF and plain-text documents are supported.';
    default:
      return data.message ?? fallback;
  }
}
