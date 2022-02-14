leaveComment = async event => {
    event.preventDefault();

    const comment = document.querySelector('#comment').value.trim();
    // get the id of the post
    const post_id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

    if (comment) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify(
                {
                    comment,
                    post_id
                }
            ),
            headers: { 'Content-Type': 'application/json' }
        })

        // reload page if comment was successfully posted
        if (response.ok) {
            document.location.reload();
            comment.value = "";
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.comment-form').addEventListener('submit', leaveComment);