function FFNStoryID(rawUrl){
	//gets the story ID from the fanfiction.net URL
	var parsedUrl = new URL(rawUrl);
	var urlPathname = parsedUrl.pathname;
	var storyId = urlPathname.split('/')[2];
	
	return storyId;
}

function ComposeScryerURL(storyId){
	return 'https://scryer.darklordpotter.net/api/v1/stories/' + storyId;
}

function ComposeBody(jsonObj){
	var body = 'Title: ' + jsonObj.title +
	'\nAuthor: ' + jsonObj.author.name +
	'\nRating: ' + jsonObj.rated +
	'\nGenre: ' + jsonObj.categories.map(a => a.name).join('/') +
	'\nStatus: ' + jsonObj.status +
	'\nLibrary Category: ' + 
	'\nPairings: ' + jsonObj.relationships.map(r => r.map(p => p.name).join('/')).join(', ') +
	'\nSummary: ' + jsonObj.summary +
	'\nLink: ' + jsonObj.external_url;
	
	return body;
}

function ComposeTitle(jsonObj){
	var title = jsonObj.title + ' by ' + jsonObj.author.name + ' - ' + jsonObj.rated;
	
	return title;
}

function AddToClipboard(text){
	const input = document.createElement('textarea');
	input.style.position = 'fixed';
	input.style.opacity = 0;
	input.value = text;
	document.body.appendChild(input);
	input.select();
	document.execCommand('Copy');
	document.body.removeChild(input);
}

function getRequest(rawUrl){
	$.get(
		ComposeScryerURL(FFNStoryID(rawUrl)),
		(data) => { AddToClipboard(ComposeBody(data)) }
	);
}

document.addEventListener('DOMContentLoaded', () => {
	var btn = document.getElementById('btnCopy');
	
	btn.addEventListener('click', () => {
		var url = document.getElementById('tbUrl').value;
		getRequest(url);
	});
});
