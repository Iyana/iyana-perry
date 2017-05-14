# Perry Reference

## Attributes

### Placeholder attributes

#### `data-perry-data`
__optional__
An absolute or partial URL that references a JSON payload.
The returned data must be a valid JSON payload that is either a JSON array or a JSON object.
If the parameter is not specified the template is rendered without merging it with any data.

#### `data-perry-template`   
__mandatory__
An absolute or partial URL that references a moustache template.
The returned data must be a valid uncompiled moustache template.
If the parameter is not specified, Perry will not recognise the `<div>` as a placeholder and its contents will be ignored.