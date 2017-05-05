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

class Perry {
    
    // entry point into Perry
    static dontDoMuch() {
        console.log("Perry: initialising");
        
        var bodySelector = $("body");
        Perry.processNodes(bodySelector);
    };
    
    static processNodes(jqueryNode) {
        console.log("PerryGlobals.tags.perryTemplateAttribute");
        
        var perryTemplateTagSelector = "[" + PerryGlobals.tags.perryTemplateAttribute + "]";
        
        jqueryNode.find(perryTemplateTagSelector).each( function(i) {
            Perry.processNode($(this));
        });

        //jqueryNode.find(perryTemplateTagSelector).each( Perry.processNode($(this)));
    };
    
    static processNode(jqueryNode) {
        console.log("Perry: Processing node: " + jqueryNode.attr("id"));
    };
}

// Boot Perry once the page has loaded

$(document).ready( function() {
    Perry.dontDoMuch();
});