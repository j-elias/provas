// TODO: Add code to check answers to questions
document.addEventListener('DOMContentLoaded', function () {
    //Get all elements with class "correct"
    let corrects = document.querySelectorAll('.correct');

    //Add event listeners to each correct button
    for (let i = 0; i < corrects.length; i++) {
        corrects[i].addEventListener('click', function () {
            //Set background color to green
            corrects[i].style.backgroundColor = 'Green';

            //Go to parent element of correct button and find the first element with class "feedback" which has that parent
            corrects[i].parentElement.querySelector('.feedback').innerHTML = 'Correct!';
        });
    }

    //When any incorrect answer is clicked, change color to red.

    let incorrects = document.querySelectorAll(".incorrect");
    for (let i = 0; i < incorrects.length; i++) {
        incorrects[i].addEventListener('click', function () {
            //Set background color to red
            incorrects[i].style.backgroundColor = 'Red';

            //Go to parent element of incorrect button and find the first element with class "feedback" which has that parent
            incorrects[i].parentElement.querySelector('.feedback').innerHTML = 'Incorrect';
        });
    }

    //Check free response submission
    document.querySelector('#check').addEventListener('click', function () {
        let input = document.querySelector('input');
        if (input.value === 'Switzerland') {
            input.style.backgroundColor = 'green';
            input.parentElement.querySelector('.feedback').innerHTML = 'Correct!';
        }
        else {
            input.style.backgroundColor = 'red';
            input.parentElement.querySelector('.feedback').innerHTML = 'Incorrect';
        }
    });
});