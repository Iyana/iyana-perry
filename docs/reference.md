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


### Error Div attributes

#### data-perry-global-error-class
Designates a `<div>` as a global error div.

When Perry encounters an error while processing any placeholders on the page, it will make this `<div>` visible and add the value
of the attribute to the div's css classes.

#### data-perry-error-class
Designates a `<div>` as a error div for a particular placeholder.

Local error divs are ignored on pages that have a global error div.

When Perry encounters an error while processing the placeholder that contains the local error div, it will make the `<div>` visible and add the value
of the attribute to the div's css classes.

