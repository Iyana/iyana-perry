# Perry
Perry is an ultra-light-weight Web Content Management System - if you can call it that.
Perry addresses a small set of problems, but addresses them well - it does not do much more.

Simply speaking, Perry provides a means for injecting dynamically loaded content into static html pages. It uses moustache templates to promote seperation-of-concern between data and its presentation.

## Getting Started

### Download the Javascript files

Download the latest stable js file for Perry from [here]. 

### Dependencies
Perry has a dependency on jquery and handlebars.js, but the perry-built.js file that you just downloaded has those dependencies built in.

### Include Perry and the dependencies
Ensure that you include Perry and all its dependencies through a set of <script> tags on your html page. 
Ideally, add this at the end of the html body.
``` 
<html>
	<head>
		...
	</head>
	<body>
		...
		<script src="./js/iyana-perry.js"></script>
	</body>
</html>
```

## Hello World
In order to render a fragment, Perry requires three things:
1. A template to be rendered
2. Data to merge into the template (optional)
3. A placeholder to render the template into

### Template
Perry uses Handlebars as its template engine. A template in Perry is a self-contained Handlerbars template.

Create a template and store it in a folder that can be accessed by your web-server
```
<div>
	Hello, {{salutation}} {{firstName}} {{lastName}} <br/>
</div>
```
### Data
Perry uses json for providing data to the template. Perry isn't fussed where the data comes from - it could be from a static json file or a dynamically generated response from a REST API.
For now, lets just create a json file that we can serve off our web server.
```
{
    "salutation": "Prof.", 
    "firstName": "Dufen",
    "lastName": "Schmurtz"
}
```
### Placeholder
And finally, we need a place to render that into. The placeholder is a `<div>` that will be replaced by Perry with the template merged with the data.
```
<html>
	...
	<div data-perry-data="../data/duff.json" data-perry-template="../template/hello.html">
		Loading ...
	</div>
	...
</html>
```

## How it works
Once a page with placeholders finishes loading, Perry looks for any `<div>` elements that have  a `data-perry-data` attribute.
It then uses the urls specified in the `data-perry-data` and `data-perry-template` attributes to download the data and template respectively. When both these resources have finish loading, Perry merges the data into the template and displays it in the placeholder.

The Placeholder div and its contents are replaced by the merged template - the inner and outer html both.

## Other Features

### Russian dolls
Perry allows for recursive templates - a template can itself contain a placeholder. If a merged template has a `<div>` with a `data-perry-data` attribute, Perry will try to resolve that placeholder as well!

### Templates without data
If you create a `<div>` that has a `data-perry-template` attribute but no `data-perry-data` attribute, Perry will simply load and display the template.

This could be useful for displaying boiler-plate information that changes regularly or loading the root template in a series of recursive templates.

### Inline templates
Perry does not recognise or support inline templates.

### JSON Object v/s JSON Array

The JSON data that is loaded by Perry can either be a JSON Object or a JSON array.

If Perry receives a JSON object, it merges the template with the JSON object and replaces the placeholder.

If Perry receives a JSON Array, it loops through the array and merges each object in the array with the template, concatenates them and replaces the placeholder.

In our Hello World example, switch to a different JSON ...
```
[
    {"salutation": "Prof.", "firstName": "Dufen","lastName": "Schmurtz"},
    {"salutation": "Dr.", "firstName": "F.","lastName": "Xavier"}
]
```

... and Perry will render

```
<div>
	Hello, Prof. Dufen Schmurtz <br/>
</div>
<div>
	Hello, Dr. F. Xavier <br/>
</div>
```

### Error handling
When Perry is unable to load and merge a template, Perry quietly logs the error to the console.

## License
Perry is licensed under the Apache 2.0 license. It is free for commercial and non-commercial use. 
The copyright for Perry vests with Iyana Limited, a company incorporated under UK law.