function outputToIframe() {
    const getGeneratedPageURL = ({ html }) => {
        const getBlobURL = (code, type) => {
            const blob = new Blob([code], { type })
            return URL.createObjectURL(blob)
        }

        const source = `${html || ''}`

        return getBlobURL(source, 'text/html')
    }

    let darkmode = '';
    const dark = document.getElementById('darkmodeOption').checked;
    if (dark) {
        darkmode = 'data-bs-theme="dark"';
    }

    let html = `<!DOCTYPE html>
<html lang="en" ${darkmode}>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Bootstrap Layout</title>
<!-- Boostrap Includes -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></scr` + `ipt>
</head>
<body class="d-flex flex-column min-vh-100">
` + document.getElementById('htmlInput').value + `
</body>
</html>`;

    const url = getGeneratedPageURL({
        html: html,
        //css: 'p { color: blue; }',
        //js: 'console.log("hi")'
    })

    

    document.getElementById('html-code').textContent=html_beautify(html);
    hljs.highlightAll();
    const iframe = document.querySelector('#iframe')
    iframe.src = url
}

function updateOutput() {
    //const htmlInput = document.getElementById('htmlInput').value;
    //const htmlOutput = document.getElementById('htmlOutput');
    //htmlOutput.innerHTML = htmlInput;
    outputToIframe()
    //document.getElementById('htmlInput').value=html_beautify(document.getElementById('htmlInput').value)
}
// updateOutput(); // Initial render of HTML code
// Render HTML code from textarea to output div on change
document.getElementById('htmlInput').addEventListener('input', () => {
    updateOutput();
});


// function to fake click on insertHtml menu item to insert HTML code into textarea
function insertHtmlCode(htmlItem) {
    const insertHtmlItem = document.querySelector(`.insertHtml[data-html-item="${htmlItem}"]`);
    if (insertHtmlItem) {
        insertHtmlItem.click();
    }
    document.getElementById('htmlInput').value=html_beautify(document.getElementById('htmlInput').value)
}
//function to insert HTML code into textarea at cursor position
function insertAtCursor(htmlCode) {
    const textarea = document.getElementById('htmlInput');
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const beforeValue = textarea.value.substring(0, startPos);
    const afterValue = textarea.value.substring(endPos, textarea.value.length);
    textarea.value = beforeValue + htmlCode + afterValue;
    // Move the cursor to the end of the inserted HTML code
    const newCursorPos = startPos + htmlCode.length;
    textarea.setSelectionRange(newCursorPos, newCursorPos);
    updateOutput(); // Update the output div with the new HTML code
    document.getElementById('htmlInput').value=html_beautify(document.getElementById('htmlInput').value)
}

function clearTextarea() {
    const textarea = document.getElementById('htmlInput');
    textarea.value = '';
    updateOutput(); // Update the output div with the new HTML code
}

const htmlOutputTabs = document.querySelectorAll('.htmlOutputTab');
htmlOutputTabs.forEach(item => {
    item.addEventListener('click', () => {
        const tab = item.getAttribute('data-tab');
        document.querySelectorAll('.htmlOutputTab').forEach(tab => { tab.classList.add('inactive'); });
        document.querySelectorAll('.output').forEach(panel => { panel.classList.add('d-none'); });
        //alert(tab)
        if(tab == 'iframe'){
            item.classList.remove('inactive');
            document.getElementById('iframe').classList.remove('d-none');
        }
        if(tab == 'html'){
            item.classList.remove('inactive');
            document.getElementById('code').classList.remove('d-none');
        }
        //alert(tab)
    })
})

let accordion_item = 0;
// Insert HTML code from menu items into textarea
const insertHtmlItems = document.querySelectorAll('.insertHtml');
insertHtmlItems.forEach(item => {
    item.addEventListener('click', () => {
        const htmlItem = item.getAttribute('data-html-item');
        let htmlCode = '';
        switch (htmlItem) {
            case 'main':
                htmlCode = `
<!-- Main Content -->
<main class="p-2 text-center">

</main>`;
                break;
            case 'header':
                htmlCode = `
<!-- Header -->
<header class="p-2 text-center">
    <h1 class="display-4">Header Title</h1>
    <p class="lead">This is a simple header description - <a href="https://getbootstrap.com/docs/5.3/content/typography/" target="_blank">See Bootstrap Typography Docs.</a></p>
</header>
`;
                break;
            case 'footer':
                htmlCode = `
<!-- Footer -->
<footer class="mt-auto text-center p-3 bg-body-tertiary text-muted small">Created by {Your Name Here} 2026</footer>
`;
                break;
            case 'text':
                htmlCode = `
<!-- Text Content -->
<h3>Heading</h3>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent massa velit, tempor non consequat in, commodo laoreet ligula. Duis eget vulputate ligula. Ut quis arcu dui. Quisque feugiat nisi et finibus molestie. Ut auctor, leo vel dapibus porta, dui diam tempor mi, ultrices sollicitudin lacus purus vitae felis. Nulla ipsum libero, placerat vitae metus mattis, ullamcorper semper elit. Nunc sagittis et nisi vel scelerisque. Pellentesque vel varius orci. Donec faucibus sit amet neque a consequat.</p>
`;
                break;
            case 'button':
                htmlCode = `
<a href="#" class="btn btn-primary">Primary</a>`;
                break;
            case 'button-danger':
                htmlCode = `
<a href="#" class="btn btn-danger">Danger</a>`;
                break;
            case 'button-outline':
                htmlCode = `
<a href="#" class="btn btn-outline-success">Success</a>`;
                break;
            case 'button-large':
                htmlCode = `
<a href="#" class="btn btn-secondary btn-lg">Large button</a>`;
                break;
            case 'button-small':
                htmlCode = `
<a href="#" class="btn btn-secondary btn-sm">Small button</a>`;
                break;
            case 'button-full':
                htmlCode = `
<a href="#" class="btn btn-primary w-100">Primary</a>`;
                break;
            case 'navbar':
                htmlCode = `
<!-- Navbar Component -->
<nav class="navbar navbar-light bg-body-secondary">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">Navbar</a>
    </div>
</nav>
`;
                break;
            case 'navbar-dark':
                htmlCode = `
<!-- Navbar (Dark) Component -->
<nav class="navbar bg-dark" data-bs-theme="dark">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">Navbar</a>
    </div>
</nav>
`;
                break;
            case 'navbar-icon':
                htmlCode = `
<!-- Navbar with Logo Component -->
<nav class="navbar bg-body-secondary">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">
            <img src="https://getbootstrap.com//docs/5.3/assets/brand/bootstrap-logo.svg" alt="Logo" width="30" height="24" class="d-inline-block align-text-top">
            Bootstrap
        </a>
    </div>
</nav>
`;
                break;
            case 'navbar-menu':
                htmlCode = `
<!-- Navbar with Menu Component -->
<nav class="navbar navbar-expand-lg bg-body-secondary">
    <div class="container-fluid">

        <!-- Branding -->
        <a class="navbar-brand" href="#">Navbar</a>
       
        <!-- Menu Toggle Button -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Navigation Menu -->
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Features</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Pricing</a>
                </li>
                <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Dropdown link
                </a>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Action</a></li>
                    <li><a class="dropdown-item" href="#">Another action</a></li>
                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                </ul>
                </li>
            </ul>
        </div>

    </div>
</nav>
`;
                break;
            case 'navbar-full':
                htmlCode = `
<!-- Navbar Component -->
<nav class="navbar navbar-expand-lg bg-body-secondary">
    <div class="container-fluid">

        <!-- Branding -->
        <a class="navbar-brand" href="#">Navbar</a>

        <!-- Menu Toggle Button -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        
        <!-- Navigation Menu -->
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Link</a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Dropdown
                    </a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                </li>
                <li class="nav-item">
                    <a class="nav-link disabled" aria-disabled="true">Disabled</a>
                </li>
            </ul>

            <!-- Search Box -->
            <form class="d-flex" role="search">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                <button class="btn btn-outline-success" type="submit">Search</button>
            </form>

        </div>

    </div>
</nav>
`;
                break;
            case 'grid-1':
                htmlCode = `
<!-- Grid container -->
<div class="container-fluid">
    
    <!-- Row -->
    <div class="row g-3 mb-3">
        
        <!-- Column -->
        <div class="col-sm-12">Column 1</div>

    </div>
</div>
`;
                break;
            case 'grid-2':
                htmlCode = `
<!-- Grid container -->
<div class="container-fluid">

    <!-- Row -->
    <div class="row g-3 mb-3">

        <!-- Column -->
        <div class="col-sm-6">Column 1</div>

        <!-- Column -->
        <div class="col-sm-6">Column 2</div>

    </div>
</div>
`;
                break;
            case 'grid-3':
                htmlCode = `
<!-- Grid container -->
<div class="container-fluid">

    <!-- Row -->
    <div class="row g-3 mb-3">

        <!-- Column -->
        <div class="col-sm-4">Column 1</div>

        <!-- Column -->
        <div class="col-sm-4">Column 2</div>

        <!-- Column -->
        <div class="col-sm-4">Column 3</div>

    </div>
</div>
`;
                break;
            case 'grid-4':
                htmlCode = `
<!-- Grid container -->
<div class="container-fluid">

    <!-- Row -->
    <div class="row g-3 mb-3">
        
        <!-- Column -->
        <div class="col-sm-6 col-md-3">Column 1</div>
        
        <!-- Column -->
        <div class="col-sm-6 col-md-3">Column 2</div>
        
        <!-- Column -->
        <div class="col-sm-6 col-md-3">Column 3</div>
        
        <!-- Column -->
        <div class="col-sm-6 col-md-3">Column 4</div>
    
    </div>
</div>
`;
                break;
            case 'card':
                htmlCode = `
<!-- Card component -->
<div class="card h-100">
    <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
</div>`;
                break;
            case 'card-dark':
                htmlCode = `
<!-- Dark Card component -->
<div class="card h-100 text-bg-dark">
    <div class="card-body">
        <h5 class="card-title">Dark card title</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
</div>
`;
                break;
            case 'card-text':
                htmlCode = `
<!-- Text Card component -->
<div class="card h-100">
    <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <h6 class="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <a href="#" class="card-link">Card link</a>
        <a href="#" class="card-link">Another link</a>
    </div>
</div>
`;
                break;
            case 'card-header':
                htmlCode = `
<!-- Card with Header component -->
<div class="card h-100">
    <div class="card-header">
        Featured
    </div>
    <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
</div>
`;
                break;
            case 'card-image-top':
                htmlCode = `
<!-- Card with Image component -->
<div class="card h-100">
    <img src="https://placeholdit.com/600x200" class="card-img-top" alt="...">
    <div class="card-body">
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
</div>
`;
                break;
            case 'card-list':
                htmlCode = `
<!-- Card with List component -->
<div class="card h-100">
    <div class="card-header">
        Featured
    </div>
    <ul class="list-group list-group-flush">
        <li class="list-group-item">An item</li>
        <li class="list-group-item">A second item</li>
        <li class="list-group-item">A third item</li>
    </ul>
</div>
`;
                break;
            case 'card-full':
                htmlCode = `
<!-- Full Card component -->
<div class="card h-100">
    <img src="https://placeholdit.com/600x200" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
    <ul class="list-group list-group-flush">
        <li class="list-group-item">An item</li>
        <li class="list-group-item">A second item</li>
        <li class="list-group-item">A third item</li>
    </ul>
    <div class="card-body">
        <a href="#" class="card-link">Card link</a>
        <a href="#" class="card-link">Another link</a>
    </div>
</div>
`;
                break;
            case 'alert':
                htmlCode = `
<!-- Alert component -->
<div class="alert alert-primary" role="alert">
    This is a primary alert - check it out!
</div>
`;
                break;
            case 'alert-danger':
                htmlCode = `
<!-- Alert component -->
<div class="alert alert-danger" role="alert">
    This is a danger alert - check it out!
</div>
`;
                break;
            case 'accordion':
                accordion_item++;
                htmlCode = `
<!-- Accordion component -->
<div class="accordion" id="accordionExample">

    <!-- Accordion Item -->
    <div class="accordion-item">
        <!-- Accordion Item Header -->
        <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse`+accordion_item+`" aria-expanded="true" aria-controls="collapse`+accordion_item+`">
            Accordion Item #1
        </button>
        </h2>
        <!-- Accordion Item Collapsible Content -->
        <div id="collapse`+accordion_item+`" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div class="accordion-body">
                <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It’s also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
            </div>
        </div>
    </div>`

    accordion_item++;

    htmlCode += `
    <!-- Accordion Item -->
    <div class="accordion-item">
        <!-- Accordion Item Header -->
        <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse`+accordion_item+`" aria-expanded="false" aria-controls="collapse`+accordion_item+`">
            Accordion Item #2
        </button>
        </h2>
        <!-- Accordion Item Collapsible Content -->
        <div id="collapse`+accordion_item+`" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div class="accordion-body">
                <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It’s also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
            </div>
        </div>
    </div>`

    accordion_item++;

    htmlCode += `
    <!-- Accordion Item -->
    <div class="accordion-item">
        <!-- Accordion Item Header -->
        <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse`+accordion_item+`" aria-expanded="false" aria-controls="collapse`+accordion_item+`">
            Accordion Item #3
        </button>
        </h2>
        <!-- Accordion Item Collapsible Content -->
        <div id="collapse`+accordion_item+`" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div class="accordion-body">
                <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It’s also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
            </div>
        </div>
    </div>

</div>
`;
                break;
            case 'list-group':
                htmlCode = `
<!-- List Group component -->
<ul class="list-group">
    <li class="list-group-item">An item</li>
    <li class="list-group-item">A second item</li>
    <li class="list-group-item">A third item</li>
    <li class="list-group-item">A fourth item</li>
    <li class="list-group-item">And a fifth one</li>
</ul>
`;
                break;
            case 'list-flush':
                htmlCode = `
<!-- List Group flush component -->
<ul class="list-group list-group-flush">
    <li class="list-group-item">An item</li>
    <li class="list-group-item">A second item</li>
    <li class="list-group-item">A third item</li>
    <li class="list-group-item">A fourth item</li>
    <li class="list-group-item">And a fifth one</li>
</ul>
`;
                break;
            case 'list-links':
                htmlCode = `
<!-- List Links Group component -->
<div class="list-group">
    <a href="#" class="list-group-item list-group-item-action">The first link item</a>
    <a href="#" class="list-group-item list-group-item-action">A second link item</a>
    <a href="#" class="list-group-item list-group-item-action">A third link item</a>
    <a href="#" class="list-group-item list-group-item-action">A fourth link item</a>
    <a href="#" class="list-group-item list-group-item-action disabled" aria-disabled="true">A disabled link item</a>
</div>
`;
                break;
            case 'list-counts':
                htmlCode = `
<!-- List with Counts component -->
<ul class="list-group text-start">

    <!-- List Item -->
    <li class="list-group-item d-flex justify-content-between align-items-start">
        <div class="ms-2 me-auto">
            <div class="fw-bold">Subheading</div>
            Content for list item
        </div>

        <!-- List Count -->
        <span class="badge text-bg-primary rounded-pill">14</span>
    </li>

    <!-- List Item -->
    <li class="list-group-item d-flex justify-content-between align-items-start">
        <div class="ms-2 me-auto">
            <div class="fw-bold">Subheading</div>
            Content for list item
        </div>

        <!-- List Count -->
        <span class="badge text-bg-primary rounded-pill">14</span>
    </li>

    <!-- List Item -->
    <li class="list-group-item d-flex justify-content-between align-items-start">
        <div class="ms-2 me-auto">
            <div class="fw-bold">Subheading</div>
            Content for list item
        </div>

        <!-- List Count -->
        <span class="badge text-bg-primary rounded-pill">14</span>
    </li>

</ul>
`;
                break;
            case 'list-colours':
                htmlCode = `
<!-- List Group with Colours component -->
<ul class="list-group">
    <li class="list-group-item">A simple default list group item</li> 
    <li class="list-group-item list-group-item-primary">A simple primary list group item</li>
    <li class="list-group-item list-group-item-secondary">A simple secondary list group item</li>
    <li class="list-group-item list-group-item-success">A simple success list group item</li>
    <li class="list-group-item list-group-item-danger">A simple danger list group item</li>
    <li class="list-group-item list-group-item-warning">A simple warning list group item</li>
    <li class="list-group-item list-group-item-info">A simple info list group item</li>
    <li class="list-group-item list-group-item-light">A simple light list group item</li>
    <li class="list-group-item list-group-item-dark">A simple dark list group item</li>
</ul>`;
                break;
            case 'form':
                htmlCode = `
<!-- Form component -->
<form class="text-start">

    <!-- Email Input -->
    <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
    </div>

    <!-- Password Input -->
    <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input type="password" class="form-control" id="exampleInputPassword1">
    </div>

    <!-- Checkbox Input -->
    <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1">
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
    </div>

    <!-- Submit Button -->
    <button type="submit" class="btn btn-primary">Submit</button>
</form>`;
                break;

            case 'form-full':
                htmlCode = `
<!-- Full Form component -->
<h4>Sign Up</h4>
<hr>
<form class="text-start">
    <div class="row g-3">

        <!-- First Name Input -->
        <div class="col-md-6">
            <div class="form-floating">
                <input type="text" class="form-control" id="fullFormFirstName" placeholder="First name">
                <label for="fullFormFirstName">First name</label>
            </div>
        </div>

        <!-- Last Name Input -->
        <div class="col-md-6">
            <div class="form-floating">
                <input type="text" class="form-control" id="fullFormLastName" placeholder="Last name">
                <label for="fullFormLastName">Last name</label>
            </div>
        </div>

        <!-- Email Input -->
        <div class="col-12">
            <label for="fullFormEmail" class="form-label">Email address</label>
            <input type="email" class="form-control" id="fullFormEmail" placeholder="name@example.com">
        </div>

        <!-- Subject Dropdown -->
        <div class="col-12">
            <label for="fullFormSubject" class="form-label">Subject</label>
            <select id="fullFormSubject" class="form-select">
                <option selected disabled value="">Choose a subject...</option>
                <option>General enquiry</option>
                <option>Support</option>
                <option>Feedback</option>
            </select>
        </div>

        <!-- Message Text Area Input -->
        <div class="col-12">
            <label for="fullFormMessage" class="form-label">Message</label>
            <textarea class="form-control" id="fullFormMessage" rows="4" placeholder="Enter your message"></textarea>
        </div>

        <!-- Checkbox Input -->
        <div class="col-12">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="fullFormUpdates">
                <label class="form-check-label" for="fullFormUpdates">Send me occasional updates</label>
            </div>
        </div>

        <!-- Submit Button -->
        <div class="col-12">
            <button type="submit" class="btn btn-primary">Submit</button>
        </div>

    </div>
</form>`;
                break;


            default:
                htmlCode = '';
        }
        const htmlInput = document.getElementById('htmlInput');
        const start = htmlInput.selectionStart;
        const end = htmlInput.selectionEnd;
        // Get spaces for currwent line indentation and add to each line of the inserted HTML code (expect the first line  which is already indented)
        const currentLine = htmlInput.value.substring(0, start).split('\n').pop();
        const spaces = currentLine.match(/^\s*/)[0];
        htmlCode = htmlCode.split('\n').map((line, index) => index === 0 ? line : spaces + line).join('\n');
        htmlInput.value = htmlInput.value.substring(0, start) + htmlCode + htmlInput.value.substring(end);
        htmlInput.selectionStart = htmlInput.selectionEnd = start + htmlCode.length;
        document.getElementById('htmlInput').value=html_beautify(document.getElementById('htmlInput').value)
        updateOutput();
    });
});

// Toggle Bootstrap CSS
// const bootstrapToggle = document.getElementById('bootstrapToggle');
// const bootstrapCssLink = document.getElementById('bootstrapCss');
// document.addEventListener("DOMContentLoaded", () => {
//     bootstrapToggle.addEventListener('change', () => {
//         if (bootstrapToggle.checked) {
//             bootstrapCssLink.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css";
//         } else {
//             bootstrapCssLink.href = "";
//         }
//     });
// });

document.getElementById('htmlInput').addEventListener('keydown', function (e) {
    if (e.key == 'Tab') {
        e.preventDefault();
        var start = this.selectionStart;
        var end = this.selectionEnd;

        // set textarea value to: text before caret + tab + text after caret
        this.value = this.value.substring(0, start) +
            "\t" + this.value.substring(end);

        // put caret at right position again
        this.selectionStart =
            this.selectionEnd = start + 1;
    }
});

function insertRandomHtmlNavbarCode() {
    const htmlItems = Array.from(
        document.querySelectorAll('.randomNavHtml .insertHtml')
    ).filter(item => {
        const name = item.dataset.htmlItem;
        return name && name !== 'main';
    });

    if (htmlItems.length === 0) return;

    const randomItem = htmlItems[
        Math.floor(Math.random() * htmlItems.length)
    ];

    insertHtmlCode(randomItem.dataset.htmlItem);

    console.log(`Inserted random HTML: ${randomItem.dataset.htmlItem}`);
}

function insertRandomHtmlCode() {
    const htmlItems = Array.from(
        document.querySelectorAll('.randomHtml .insertHtml')
    ).filter(item => {
        const name = item.dataset.htmlItem;
        return name && name !== 'main';
    });

    if (htmlItems.length === 0) return;

    const randomItem = htmlItems[
        Math.floor(Math.random() * htmlItems.length)
    ];

    insertHtmlCode(randomItem.dataset.htmlItem);

    console.log(`Inserted random HTML: ${randomItem.dataset.htmlItem}`);
}



// Set up Basic Page
clearTextarea(); // Clear the textarea on page load
// insertHtmlCode('navbar-menu'); // Insert the HTML code for the navbar-menu into the textarea on page load
insertRandomHtmlNavbarCode();
insertAtCursor('\n\n<!-- Main Content -->\n<main class="p-2 text-center">\n\n'); // Insert the HTML code for the main element into the textarea on page load
    insertAtCursor('\n\t');
    insertHtmlCode('header'); // Insert the HTML code for the header into the textarea on page load
    // insertHtmlCode('grid-3'); // Insert the HTML code for the grid-4 into the textarea on page load
    // Row
    insertAtCursor('\n\n\t<!-- Grid Container -->\n');
    insertAtCursor('\n\t<div class="container-fluid">\n');
        
        insertAtCursor('\n\n\t\t<!-- Row -->\n');
        insertAtCursor('\t\t<div class="row g-3 mb-3">\n');

            // Column
            insertAtCursor('\n\n\t\t\t<!-- Column -->\n');
            insertAtCursor('\t\t\t<div class="col-sm-6">\n');
            insertAtCursor('\t\t\t\t');
            insertRandomHtmlCode();
            insertAtCursor('\n\t\t\t</div>\n');
            
            // Column>
            insertAtCursor('\n\n\t\t\t<!-- Column -->\n');
            insertAtCursor('\t\t\t<div class="col-sm-6">\n');
            insertAtCursor('\t\t\t\t');
            insertRandomHtmlCode();
            insertAtCursor('\n\t\t\t</div>\n');

        insertAtCursor('\n\n\t\t</div>\n');

        insertAtCursor('\n\n\t\t<!-- Row -->\n');
        insertAtCursor('\t\t<div class="row g-3 mb-3">\n');
            // Column
            insertAtCursor('\n\n\t\t\t<!-- Column -->\n');
            insertAtCursor('\t\t\t<div class="col-md-4">\n');
            insertAtCursor('\t\t\t\t');
            insertRandomHtmlCode();
            insertAtCursor('\n\t\t\t</div>\n');

            // Column
            insertAtCursor('\n\n\t\t\t<!-- Column -->\n');
            insertAtCursor('\t\t\t<div class="col-md-4">\n');
            insertAtCursor('\t\t\t\t');
            insertRandomHtmlCode();
            insertAtCursor('\n\t\t\t</div>\n');
            
            // Column
            insertAtCursor('\n\n\t\t\t<!-- Column -->\n');
            insertAtCursor('\t\t\t<div class="col-md-4">\n');
            insertAtCursor('\t\t\t\t');
            insertRandomHtmlCode();
            insertAtCursor('\n\t\t\t</div>\n');

    insertAtCursor('\n\n\t\t</div>\n\t</div>\n');


insertAtCursor('</main>'); // Close the main element

insertHtmlCode('footer');

setTimeout('outputToIframe();', 100);

// Add  data-bs-theme="dark" to html tag
const darkmodeOption = document.getElementById('darkmodeOption');
darkmodeOption.addEventListener('change', () => {
    outputToIframe();
    // if (darkmodeToggle.checked) {
    //     document.documentElement.setAttribute('data-bs-theme', 'dark');
    // } else {
    //     document.documentElement.setAttribute('data-bs-theme', '');
    // }
});

const darkmodeToggle = document.getElementById('darkmodeToggle');
darkmodeToggle.addEventListener('change', () => {
    if (darkmodeToggle.checked) {
        document.documentElement.setAttribute('data-bs-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-bs-theme', '');
    }
});

const iframeRange = document.getElementById('iframeWidth');
iframeRange.addEventListener('input', () => {
    document.getElementById('iframeHolder').style.width = `${iframeRange.value}%`;
});

    // On click, copy content of the code block to clipboard
document.querySelectorAll('pre code').forEach((codeBlock) => {
    codeBlock.addEventListener('click', () => {
        const text = codeBlock.textContent;
        navigator.clipboard.writeText(text).then(() => {
            // alert('Code copied to clipboard!');
            // Show Bootstrap toast message
            const toastElement = document.getElementById('copyToast');
            const toast = new bootstrap.Toast(toastElement);
            toast.show();
            
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    });
});