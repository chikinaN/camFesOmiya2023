function openTab(tabNumber) {
    var i, tabContents;

    tabContents = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove("active");
    }

    document.getElementById("tab" + tabNumber).classList.add("active");
}
