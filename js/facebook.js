"use strict";

// uzklausiame duomenu
// console.log(feed);

// panaudojame duomenis turinio generavimui
function renderFeed( data ) {
    if ( !Array.isArray(data) ) {
        return console.error('Duok array\'ju!!!');
    }

    let HTML = '';

    for ( let i=0; i<data.length; i++ ) {
        const postData = data[i];
        HTML += renderPost(postData);
    }

    return document.querySelector('.feed').innerHTML = HTML;
}

function renderPost( data ) {
    let HTML = `<div class="post">
                   ${renderPostHeader( data.author, data.postingTime)}
                   ${renderPostContent( data.content)}
                   ${renderPostFooter( )}
                </div>`;

    return HTML;
}

function renderPostHeader( author, postingTime){
    console.log(author);
    console.log(postingTime);

    let HTML ='';
    HTML= ' <div class="header">HEADER</div>';
    return HTML;
}
function renderPostContent(){
    let HTML='';
    HTML= ' <div class="content">CONTENT</div>';
    return HTML;
}
function renderPostFooter(){
    // let HTML ='';
    return ' <div class="footer">FOOTER</div>';
}


renderFeed( feed );
