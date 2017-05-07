/* 
 * Copyright 2017 fgyara.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import $ from 'jquery';
import PerryGlobals from 'PerryGlobals';
import Handlebars from 'Handlebars';

class Perry {
    
    // entry point into Perry
    static dontDoMuch() {
        console.log("Perry: initialising");
        
        var bodySelector = $("body");
        Perry.processNodes(bodySelector);
    };
    
    static processNodes(jqueryNode) {
        var perryTemplateTagSelector = "[" + PerryGlobals.tags.perryTemplateAttribute + "]";
        
        jqueryNode.find(perryTemplateTagSelector).each( function(i) {
            Perry.processNode($(this));
        });

        jqueryNode.filter(perryTemplateTagSelector).each( function(i) {
            Perry.processNode($(this));
        });
        
    };
    
    static processNode(jqueryNode) {
        console.log("Perry: Processing node: #" + jqueryNode.attr("id"));
        
        var perryNode = { 
            id: "#" + jqueryNode.attr("id"), 
            jqueryNode: jqueryNode,
            template: {
                url: null,
                loaded: false,
                data: null
            },
            data: {
                url: null,
                loaded: false,
                data: null,
                required: true
            }
        };

        // get the template and data
        perryNode.template.url = jqueryNode.attr(PerryGlobals.tags.perryTemplateAttribute);
        perryNode.data.url = jqueryNode.attr(PerryGlobals.tags.perryDataAttribute);

        if (perryNode.template.url === undefined) {
            console.warn("Perry: " + perryNode.id + ": template url is undefined. Node not processed.");
            return;
        }
        console.log("Perry: " + perryNode.id + ": template: " + perryNode.template.url);
        
        // data is not mandatory
        if (perryNode.data.url === undefined) {
            console.log("Perry: " + perryNode.id + ": data url is undefined. Marking not required.");
            perryNode.data.required = false;
        }
        console.log("Perry: " + perryNode.id + ": data: " + perryNode.data.url);

        // all params ok - lets load em up
        Perry.load(perryNode.template, perryNode);
        Perry.load(perryNode.data, perryNode);
    };
    
    static load(dataNode, node) {
        
        var boundDoneFn = Perry.onDataLoaded.bind(this, dataNode, node);
        var boundFailFn = Perry.onDataError.bind(this, dataNode, node);
        
        $.ajax({
            url: dataNode.url,
            type: 'get',
            async: true,
            cache: false
        })
            .done(boundDoneFn)
            .fail(boundFailFn);
    }
    
    static onDataLoaded(dataNode, node, data) {
        console.log("Perry: " + node.id + ": Succesfully loaded " + dataNode.url);
        dataNode.loaded = true;
        dataNode.data = data;
        
        Perry.attemptMerge(node);
    }
    
    static onDataError(dataNode, node, response) {
        console.warn("Perry: " + node.id + ": Failed to load " + dataNode.url + " with code " + response.status);
    }
    
    
    static attemptMerge(node) {
        // if template is not yet loaded dont do anything
        if (!node.template.loaded) {
            return;
        }
        
        // if data is required and not yet loaded, dont do anything
        if ((node.data.required) && (!(node.data.loaded))) {
            return;
        }
        
        console.log("Perry: " + node.id + " : Merge started");

        // compile the template
        var compiledTemplate = Handlebars.compile(node.template.data);
        var html = compiledTemplate(node.data.data);

        // convert into a set of DOM nodes
        // Do not use $(html) directly as it cannot parse arbitrary html properly
        var domNodes = $.parseHTML(html);

        // if it is the body tag, change the inner html
        // if it is anything else, replace it
        if (node.jqueryNode.prop("tagName") === "BODY") {
            node.jqueryNode.html(domNodes);
        } else {
            node.jqueryNode.replaceWith(domNodes);
        }

        // Support recursive templates
        //
        // At this stage, domNodes is inserted into the browser DOM, so
        // modifying domNodes should result in modification of browser DOM too!

        // First, prepare domNodes for JQuery
        var jqueryNodes = $(domNodes);

        // then process the child nodes in what was just created
        Perry.processNodes(jqueryNodes);            

    }
    
}

// Boot Perry once the page has loaded

$(document).ready( function() {
    Perry.dontDoMuch();
});