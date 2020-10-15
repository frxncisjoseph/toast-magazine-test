window.addEventListener("DOMContentLoaded", function () {
  // Navbar
  (function () {
    // Get elements
    let burgerButton = document.querySelector("#burger");
    let menuWrapper = document.querySelector(".navbar-menu-wrapper");

    // Add click listener
    burgerButton.addEventListener("click", function () {
      // Check class and Show/Hide
      if (document.body.classList.contains("navbar-active")) {
        menuWrapper.style.maxHeight = null;
        menuWrapper.style.paddingBottom = "0";
      } else {
        menuWrapper.style.paddingBottom = "2.5rem";
        menuWrapper.style.maxHeight = menuWrapper.scrollHeight + "px";
      }

      // Toggle class
      document.body.classList.toggle("navbar-active");
    });
  })();

  // Comment box
  (function () {
    // Load comments via JSON from the mockup api
    $.ajax({
      url: "https://5f7dd1aa834b5c0016b06a66.mockapi.io/api/v1/comments/1",
      type: "GET",
      success : function (response) {
        const comments = Object.values(response).sort(function(a,b){
          return new Date(b.timeStamp) - new Date(a.timeStamp);
        });

        const commentBox = $('.comment-box')

        for (let comment in comments) {
          var commentData = comments[comment];

          let date = new Date(commentData.timeStamp * 1000);

          // Check if the comment has any replies
          let replies = comments.filter(function(r) {
            // Check if the comment has a parent id
            if (r.parentId === commentData.parentId && r.parentId !== "none") {
              return r;
            }
          });
          
          if (comments.hasOwnProperty(comment)) {
            let commentDivElement = commentData.parentId === 'None' ? '' :  '<div class="comment-block">' +
              `<a href="#" class="comment-name">${commentData.author + commentData.lastName}</a>` +
              `<span class="comment-date">${date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} ${date.toLocaleTimeString()}</span>` +
              `<p>${commentData.comment}</p>` +
              '<a href="#" class="comment-btn">reply</a>' +
              '</div>';

            for (let reply in replies) {
              const replyData = replies[reply];
              
              let replyDate = new Date(replyData.timeStamp * 1000);

              commentDivElement += `<div class="comment-block comment-block-response">` +
                `<a href="#" class="comment-name">${replyData.author + replyData.lastName}</a>` +
                `<span class="comment-date">${replyDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} ${replyDate.toLocaleTimeString()}</span>` +
                `<p>${replyData.comment}</p>` +
                '<a href="#" class="comment-btn">reply</a>' +
                '</div>';
            }
            
            commentBox.append(commentDivElement);
          }
        }
      }
    })
  
  })();

  // Newsletter
  (function () {
    // Get elements
    let newsletterButton = document.querySelector("#submit");

    // Add click listener
    newsletterButton.addEventListener("click", function(event) {
      event.preventDefault();

      // Get elements
      let emailInput = document.querySelector(".email").value;

      // Validate the email
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (re.test(String(emailInput).toLowerCase())) {
        // Post the newsletter form
        $.ajax({
          url : "https://5f7dd1aa834b5c0016b06a66.mockapi.io/api/v1/subscribe",
          type : "POST",
          data: { email: emailInput },
          success : function () {
            alert("Thank you for subscribing to our newsletter!");
          }
        });
      } else {
        alert("Please enter a valid email.")
      }
    });
  })();

  $(".news-carousel").slick({
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        }, 
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ],
  });
});
