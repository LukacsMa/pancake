let orderByUser = document.querySelectorAll(".ordered-item");
let logedInUser = document.queryCommandValue("#userName");
let table = document.querySelector("#orderTable");

function inBasket() {

    let basketList = [];
    let finalSum;
    let sum = 0;
    for (let i = 0; i < orderByUser.length; i++) {
        if (orderByUser[i].checked) {
            sum += Number(orderByUser[i].parentNode.previousElementSibling.innerText);
            basketList.push(orderByUser[i].parentNode.previousElementSibling.previousElementSibling.innerText);
        }
    }

    if (sum !== 0) {

        let tableRow = document.createElement("tr");
        let tableCell = document.createElement("td");
        let tableSum = document.createElement("td");
        let tableButton = document.createElement("td");

        table.appendChild(tableRow);
        tableRow.appendChild(tableCell);
        tableRow.appendChild(tableSum);
        tableRow.appendChild(tableButton);
        tableCell.innerText = basketList;
        tableCell.className = "list";
        tableSum.innerHTML = `${sum}`;
        tableSum.className = "sum";
        tableButton.innerHTML = `<button class="delOrder">Törlés</button>`;

        let delButton = document.querySelectorAll(".delOrder");

        let sumSum = document.querySelectorAll(".sum");

        function calculateFinalSum() {
            finalSum = 0;
            for (let i = 0; i < sumSum.length; i++) {
                finalSum += Number(sumSum[i].innerText);
                document.querySelector("#finalSum").innerHTML = `${finalSum}Ft`;
            }
        }

        function removeCell() {
            let minus = Number(this.parentElement.previousElementSibling.innerText);
            finalSum -= minus;
            document.querySelector("#finalSum").innerHTML = `${finalSum}Ft`;
            this.parentElement.parentElement.remove();

        }

        for (let i = 0; i < delButton.length; i++) {
            delButton[i].addEventListener("click", removeCell);
        }

        calculateFinalSum();
    }
}

document.querySelector("#basket").addEventListener("click", inBasket);

function mySubmit() {
    let submitSum = 0;
    let sumSum = document.querySelectorAll(".sum");
    for (let i = 0; i < sumSum.length; i++) {
        submitSum += Number(sumSum[i].innerText);
    }

    let submitList = [];
    let list = document.querySelectorAll(".list");
    for (let i = 0; i < list.length; i++) {
        submitList.push(list[i].innerText + " ");
    }


    let form = document.querySelector("#form");;
    let submitSumInput = document.createElement("input");
    form.appendChild(submitSumInput);
    submitSumInput.value = submitSum;
    submitSumInput.setAttribute("name", "submitSum");
    let submitListInput = document.createElement("input");
    form.appendChild(submitListInput);
    submitListInput.value = submitList;
    submitListInput.setAttribute("name", "submitList");
}

document.querySelector("#submit").addEventListener("click", mySubmit);