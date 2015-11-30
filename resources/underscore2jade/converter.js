let evaluateTagname;
let throwTagname;
let templateSettings;

let trim = value => value.trim()
	.replace(/^rc\./, '');

let cleanContent = (content) => {
	let evaluate = new RegExp(templateSettings.evaluate.source, 'g', 'm');
	let evaluateInTag = new RegExp(`(<[^>%]+)${templateSettings.evaluate.source}([^<%]*>)`, 'g', 'm');

	return content
		.replace(templateSettings.escape, (allMatch, g) => `#{${trim(g)}}`)
		.replace(templateSettings.interpolate, (allMatch, g) => `!{${trim(g)}}`)
		.replace(evaluateInTag, (allMatch, g1, g2, g3) => {
			return `${g1}${g3}<${throwTagname}>{{${g2.replace(/<%/g, '{{')
				.replace(/%>/g, '}}')}}}</${throwTagname}>`;
		})
		.replace(evaluate, (allMatch, g) => `<${evaluateTagname}>${g}</${evaluateTagname}>`);
};

let compileContent = (content) => {
	let cheerio = require('cheerio'), compiledContent = '',
		parsedContent = cheerio.load(content);
	parsedContent.root()
		.children()
		.each(function (index, value) {
			compiledContent += process(value, 0, [])
					.join('\n') + '\n';
		});

	return compiledContent;
};

let finishContent = (content) => {
	return content
		.replace(/='[!#]\{([^}]+)\}'/g, (all, group) => `=${group}`)
		.replace(/([^a-zA-Z_])rc\./g, '$1')
		.replace(/\s+\n/g, '\n')
		.replace(new RegExp(throwTagname + '([\\n\\s\\t]*)\\|[\\s\\t]*', 'gm'), '//$1conflict!$1')
		.replace(new RegExp(evaluateTagname + '[\\n\\s\\t]*\\|', 'gm'), '-');
};

let jadeWrapIndent = (renderedContent, indentLevel) => {
	let indentation = [];
	for (let i = 0; i < indentLevel; i++) {
		indentation.push('  ');
	}
	return indentation.join('') + renderedContent.replace(/\n/g, ' ');
};

let jadeComment = content => `// ${content}`;
let jadePipedText = content => `| ${content}`;

let jadeTag = (tag, attribs) => {
	var attrStr = '',
		tagAddition = '',
		renderedTag = '',
		attrs = [];

	for (let key in attribs) {
		if (attribs.hasOwnProperty(key)) {
			let val = attribs[key];
			switch (key) {
				case 'id':
					tagAddition = `#${val}` + tagAddition;
					break;
				case 'class':
					val && (tagAddition += `.${val.trim()
						.split(' ')
						.join('.')}`);
					break;
				default:
					attrs.push(`${key}='${val}'`);
			}
		}
	}
	attrStr = attrs.join(', ');
	if (tagAddition && tag === 'div') {
		tag = '';
	}
	renderedTag += tag + tagAddition + (attrStr ? `(${attrStr})` : '');

	return renderedTag;
};

let process = (tagTree, indentLevel, list) => {
	list.push(jadeWrapIndent(jadeTag(tagTree.name, tagTree.attribs, tagTree.data), indentLevel));
	tagTree.children.forEach(value => {
		switch (value.type) {
			case 'tag':
				process(value, indentLevel + 1, list);
				break;
			case 'text':
				if (value.data.trim()) {
					list.push(jadeWrapIndent(jadePipedText(value.data.trim()), indentLevel + 1));
				}
				break;
			case 'comment':
				list.push(jadeWrapIndent(jadeComment(value.data), indentLevel + 1));
				break;
		}
	});

	return list;
};


module.exports = (options = {}) => {
	evaluateTagname = options.evaluateTagname || 'scriptinjection';
	throwTagname = options.throwTagname || 'throwinjection';
	templateSettings = options.templateSettings || require('lodash.templatesettings');
	return {
		convert: (html) => {
			var content = cleanContent(html);
			content = compileContent(content);
			content = finishContent(content);
			return content;
		}
	};
};