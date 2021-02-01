const Modal = {
    open() {
        // Abrir modal 
        // Adiciona a class active ao modal
        document
            .querySelector(".modal-overlay")
            .classList.add("active");
    },
    close() {
        //  Fechar o modal 
        // Remove a class active do modal
        document
            .querySelector(".modal-overlay")
            .classList.remove("active");
    }
};

const transactions = [

    {
        id: 1,
        description: "Luz",
        amount: -50000,
        date: "23/01/2021"
    },

    {
        id: 2,
        description: "Website",
        amount: 500000,
        date: "23/01/2021"
    },

    {
        id: 3,
        description: "Internet",
        amount: -20000,
        date: "23/01/2021"
    },

    {
        id: 4,
        description: "App",
        amount: 200000,
        date: "23/01/2021"
    }

];

const Transaction = {
    all: transactions,

    add(transaction) {
        Transaction.push(transaction);
        App.reload();
    },
    incomes() {
        let income = 0;
        Transaction.all.forEach(transaction => {
            if (transaction.amount > 0) {
                income += transaction.amount;
            }
        });
        return income;
    },
    expenses() {
        let expense = 0;
        Transaction.all.forEach(transaction => {
            if (transaction.amount < 0) {
                expense += transaction.amount;
            }
        });
        return expense;
    },
    total() {
        return Transaction.incomes() + Transaction.expenses();
    }
};

const DOM = {
    transactionsContainer: document.querySelector("#data-table tbody"),

    addTransaction(transaction, index) {
        const tr = document.createElement("tr");
        tr.innerHTML = DOM.innerHTMLTrasaction(transaction);

        DOM.transactionsContainer.appendChild(tr);
    },

    innerHTMLTrasaction(transaction) {
        const cssClass = transaction.amount > 0 ? "income" : "expense";

        const amount = Utils.formatCurrency(transaction.amount)

        const html = `
        <td class="description">${transaction.description}</td>
        <td class="${cssClass}">${amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
            <img src="./assets/minus.svg" alt="Remover Transação">
        </td>`

        return html;
    },

    updateBalance() {
        document
            .getElementById("incomeDisplay")
            .innerHTML = Utils.formatCurrency(Transaction.incomes());
        document
            .getElementById("expenseDisplay")
            .innerHTML = Utils.formatCurrency(Transaction.expenses());
        document
            .getElementById("totalDisplay")
            .innerHTML = Utils.formatCurrency(Transaction.total());
    }
};

const Utils = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? '-' : '';

        value = String(value).replace(/\D/g, '');

        value = Number(value) / 100;

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

        return signal + " " + value;
    }
};

const App = {
    init() {
        Transaction.all.forEach(transaction => {
            DOM.addTransaction(transaction)
        });

        DOM.updateBalance();
    },

    reload() {
        App.init()
    }
}

app.init()

Transaction.add({
    id: 24,
    description: "hj",
    amount: 100,
    date: "01/02/2021"
})