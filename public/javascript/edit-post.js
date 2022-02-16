editPost = async event => {
    event.preventDefault();

    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();

    // get the id of the post
    const post_id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

    const response = await fetch(`/api/posts/${post_id}`, {
        method: 'PUT',
        body: JSON.stringify(
            {
                title,
                content
            }
        ),
        headers: { 'Content-Type': 'application/json' }
    })

    if (response.ok) {
        document.location.replace(`/posts/${post_id}`)
    } else {
        alert(response.statusText);
    }
}

deletePost = async event => {
    event.preventDefault();

    // get the id of the post
    const post_id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

    const response = await fetch(`/api/posts/${post_id}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        document.location.replace('/dashboard')
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.save-post').addEventListener('click', editPost);
document.querySelector('.delete-post').addEventListener('click', deletePost);