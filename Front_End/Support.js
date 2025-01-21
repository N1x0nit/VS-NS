document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".faq-question").forEach(button => {
        button.addEventListener("click", () => {
            const answer = button.nextElementSibling; // faq-answer
            const icon = button.querySelector(".icon");
            const isActive = answer.classList.contains("active");
            
            if (isActive) {
                answer.classList.remove("active");
                icon.textContent = "+";
            } else {
                answer.classList.add("active");
                icon.textContent = "−";
            }
        });
    });
});

