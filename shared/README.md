# abof-react-components

## Using this modules in projects

### NPM Dependencies

These needs to be part of the packages.json of the project which uses `abof-react-components`.

- svg-sprite-loader
- node-sass-json-importer
- bourbon
- bourbon-neat
- sanitize.css
- uuid

### CSS

The base CSS style needs to be imported to base component
(container). Add these lines to top of the base component's SCSS file.

```SCSS
// settings
@import 'settings.core';

// Here you have to add the project's settings

// tools
@import 'tools.core';

@import '~sanitize.css/lib/sanitize.scss';

// core
@import 'base.base';
```
