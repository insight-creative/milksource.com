# Hugo v0.128.0+ Compatibility Update

## Changes Made

### 1. Configuration Update (config.toml)
- Replaced deprecated `paginate = "9"` with `[pagination]` section and `pagerSize = 9`

### 2. PostCSS Function Update (layouts/partials/head.html)  
- Replaced deprecated `resources.PostCSS` with `css.PostCSS`

## Files Modified
- `/config.toml`
- `/layouts/partials/head.html`

## Result
- ✅ Eliminates Hugo v0.128.0+ deprecation errors
- ✅ Maintains all existing functionality
- ✅ Site builds and runs without warnings