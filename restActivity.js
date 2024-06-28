const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

function renderResult(data) {
    const resultContainer = document.getElementById('resultContainer');
    resultContainer.innerHTML = `<div class="result"><pre>${JSON.stringify(data, null, 2)}</pre></div>`;
}

function getAllPosts() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => renderResult(data))
        .catch(error => console.error('Error fetching posts:', error));
}

function getPostById(id) {
    fetch(`${apiUrl}/${id}`)
        .then(response => response.json())
        .then(data => renderResult(data))
        .catch(error => console.error(`Error fetching post ${id}:`, error));
}

function createNewPost() {
    const newPost = {
        title: 'This is a new title.',
        body: 'This is the body of a new post.',
        userId: 1
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
    })
    .then(response => response.json())
    .then(data => {
        console.log('New post created with ID:', data.id);
        renderResult(data);
    })
    .catch(error => console.error('Error creating new post:', error));
}

function replacePostById(id) {
    const updatedPost = {
        title: 'Updated Post Title',
        body: 'This is the updated body of the post.',
        userId: 1 
    };

    fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedPost)
    })
    .then(response => response.json())
    .then(data => renderResult(data))
    .catch(error => console.error(`Error replacing post ${id}:`, error));
}

function updatePostTitleById(id) {
    const updatedTitle = {
        title: 'Updated Post Title for ID 12'
    };

    fetch(`${apiUrl}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedTitle)
    })
    .then(response => response.json())
    .then(data => renderResult(data))
    .catch(error => console.error(`Error updating title for post ${id}:`, error));
}

function deletePostById(id) {
    fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            renderResult({ message: `Successfully deleted post ${id}` });
        } else {
            throw new Error(`Error deleting post ${id}`);
        }
    })
    .catch(error => console.error(error));
}
