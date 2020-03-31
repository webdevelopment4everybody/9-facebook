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
    return `<div class="post">
                ${renderPostHeader( data.author, data.time )}
                ${renderPostContent( data.content )}
                ${renderPostFooter()}
            </div>`;
}

function renderPostHeader( author, time ) {
    let HTML = '';

    HTML = `<div class="header">
                <img src="./img/${author.img}">
                <div class="texts">
                    <div class="title">
                        <a href="${author.link}">${author.name} ${author.surname}</a>
                    </div>
                    <div class="time">${ convertTime(time) }</div>
                </div>
                <i class="fa fa-ellipsis-h"></i>
            </div>`;

    return HTML;
}

function renderPostContent( content ) {
    let HTML = '<div class="content">';
    if ( content.text ) {
        HTML += renderPostContentText( content );
    }
    if ( content.images ) {
        HTML += renderPostContentGallery( content.images );
    }
    HTML += '</div>';

    return HTML;
}

function renderPostContentText( content ) {
    const maxTextLength = 240;
    const smallestTextLength = 30;
    let HTML = '';
    let style = '';
    let text = content.text;

    if ( text.length <= smallestTextLength ) {
        style += 'big-text';
    }

    if ( content.background ) {
        if ( !content.images || content.images.length === 0 ) {   
            style += ' '+content.background;
        }
    }

    if ( text.length >= maxTextLength ) {
        text = text.substring( 0, maxTextLength );
        let skipSymbols = 0;
        for ( let i=maxTextLength-1; i>=0; i-- ) {
            if ( text[i] === ' ' ) {
                break;
            }
            skipSymbols++;
        }
        text = text.substring( 0, maxTextLength-skipSymbols-1 );
        text += '... <span class="more">Read more</span>';
    }

    HTML = `<p class="${style}" data-fulltext="${content.text}">${text}</p>`;

    return HTML;
}

function renderPostContentGallery( images ) {
    let HTML = '';
    let imgHTML = '';
    let moreHTML = '';
    let goodPhotoCount = 0;
    let galleryClass = '';

    if ( !Array.isArray(images) ||
         images.length === 0 ) {
        return '';
    }

    for ( let i=0; i<images.length; i++ ) {
        if ( typeof(images[i]) === 'string' &&
             images[i].length >= 5 &&
             images[i].length < 100 ) {
            goodPhotoCount++;
            if ( goodPhotoCount <= 4 ) {
                imgHTML += `<img src="./img/${images[i]}">`;
            }
        }
    }

    galleryClass = goodPhotoCount;
    if ( goodPhotoCount > 4 ) {
        galleryClass = 4;
        moreHTML = `<div class="more">+${goodPhotoCount - 4}</div>`;
    }
    HTML = `<div class="gallery gallery-${galleryClass}">
                ${imgHTML}
                ${moreHTML}
            </div>`;
    
    if ( goodPhotoCount === 0 ) {
        return '';
    }

    return HTML;
}

function renderPostFooter() {
    return `<div class="footer">
                <div class="row">
                    <div class="action">
                        <i class="fa fa-thumbs-up"></i>
                        <div class="text">Like</div>
                    </div>
                    <div class="action">
                        <i class="fa fa-comment-o"></i>
                        <div class="text">Comment</div>
                    </div>
                </div>
                <div class="row">
                    <img src="./img/user.png">
                    <div class="comment-form">
                        <textarea></textarea>
                        <div class="interactions">
                            <i class="fa fa-smile-o"></i>
                            <i class="fa fa-camera"></i>
                            <i class="fa fa-file-image-o"></i>
                            <i class="fa fa-user-secret"></i>
                        </div>
                    </div>
                </div>
            </div>`;
}

function convertTime( timestamp ) {
    let time = '';
    const now = Date.now();
    let seconds = Math.round((now-timestamp) /1000);

    //0s-15s Just now
    if(seconds <16){
        return 'Just now';
    }
    // 16s-59 -[x]s
    if(  seconds<60){
        return seconds +'s';
    }
    //1min-59min -[x]min
    let minutes = Math.round(seconds/60);
    if(minutes <60){
        return minutes + 'min';
    }
    //24h
    let hours = minutes /60;
    if(hours <24){
        return hours + 'h';
    }
    //7d
    let days = hours / 24;
    if(days < 7){
        return days+ 'd';


    }
    //4w
    let weeks = Math.floor(days /7);
    if( weeks<5 ){
        return weeks+'w';
    }
    //12m
    let months = Math.floor(days /30);
    if(months <12){
        return months +'m';
    }
  
    //1y++
    return Math.floor(days /365)+'y';
}

renderFeed( feed );

const readMores = document.querySelectorAll('.post p > .more');

for ( let i=0; i<readMores.length; i++ ) {
    const readMore = readMores[i];
    readMore.addEventListener('click', readMoreClick );
}

function readMoreClick( event ) {
    const p = event.target.closest('p');
    const fullText = p.dataset.fulltext;
    return p.innerText = fullText;
}