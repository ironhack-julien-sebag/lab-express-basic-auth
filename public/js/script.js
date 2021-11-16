document.addEventListener(
    "DOMContentLoaded",
    () => {
        console.log("lab-express-basic-auth JS imported successfully!")
    },
    false
)

const helper = document.querySelector(".helper")
const password = document.querySelector("#password")

password.addEventListener("keyup", () => {
    // helper.innerHTML = password.ariaValueMax.length
    // helper.innerText = "1"
    const min = 6
    if (password.value.length < min) {
        helper.innerText = `Only ${min - password.value.length} characters left`
    } else {
        helper.innerText = "✅ Your password is good"
    }
})
