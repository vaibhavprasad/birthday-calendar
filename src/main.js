var module = (function () {
    const DAY_MAP = {
        0: {
            name: 'sunday',
            label: 'SUN'
        },
        1: {
            name: 'monday',
            label: 'MON'
        },
        2: {
            name: 'tuesday',
            label: 'TUE'
        },
        3: {
            name: 'wednesday',
            label: 'WED'
        },
        4: {
            name: 'thursday',
            label: 'THU'
        },
        5: {
            name: 'friday',
            label: 'FRI'
        },
        6: {
            name: 'saturday',
            label: 'SAT'
        }
    }
    
    const COLOR_LIST = [
        '#555d7b',
        '#9fd53c',
        '#c97d99',
        '#79cae5',
        '#e94933',
        '#2155d0',
        '#ec46a9',
        '#52ccf9',
        '#f39b3f',
        '#e64a33'
    ];
    
    // onchange of text area or year, check for correctness of data and display the message accordingly
    function handleEvent () {
        let year = document.getElementById('inpYear').value;
        let bdList = document.getElementById('bdList').value;
        try {
            bdList = JSON.parse(bdList);
            document.getElementById('bdList').style.background = "#fff";
            driver(bdList, year ? year : new Date().getFullYear());
        } catch (error) {
            document.getElementById('bdList').style.background = "#f9000061";
            renderCalendar();
        }
    }
    
    function driver (birthDayData = [], year = new Date().getFullYear()) {
        let sortedData = getSortedList(birthDayData);
        let dayWiseData = getAllDaysdata(year, sortedData);
        renderCalendar(dayWiseData);
    }
    
    function getAllDaysdata (year, bdList = []) {
        let res = {};
        bdList.forEach(item => {
            let bday = getDay(item.birthday, year);
            if (res[bday]) {
                res[bday].push(item);
            } else {
                res[bday] = [item];
            }
        });
        return res;
    }
    
    function getDay (date, year) {
        try {
            let [d,m,y] = date.split('/');
            [y,m,d] = [year,m,d];
            return new Date([y,m,d].join('-')).getDay();
        } catch (error) {
            console.log('Error in formatting date and year: ', date, ' - ', year);
        }
    }
    
    function formatDate (date) {
        let [d,m,y] = date.split('/');
        [y,m,d] = [y,m,d];
        return new Date([y,m,d].join('-')).getTime();
    }
    
    function getSortedList (data = []) {
        return data.sort((item1, item2) => formatDate(item1.birthday) < formatDate(item2.birthday) ? 1 : -1);
    }
    
    function getNameInitials (name = '') {
        return name.split(' ').map(item => item[0]).join('').toUpperCase()
    }
    
    function getRowsCols (bdCount = 1) {
        // re calculate the rows and columns
        let rowCol = Math.ceil(Math.log2(bdCount));
        let gridStyle = 'height: calc(100% - 3rem); ';
        if (rowCol == 1) {
            gridStyle += 'grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr;';
        } else if (rowCol > 1){
            rowCol = `repeat(${rowCol}, minmax(1rem, 1fr))`;
            gridStyle += `grid-template-rows: ${rowCol}; grid-template-columns: ${rowCol};`
        }
        return gridStyle;
    }
    
    // Rendering Logic
    
    function bdCountLabel (count = 0) {
        let label = '';
        if (count <= 0) {
            label = 'No birthdays';
        } else if (count == 1) {
            label = '1 birthday';
        } else {
            label = `${count} birthdays`;
        }
        return label;
    }
    
    function renderCalendar (data = []) {
        let container = document.getElementById('calContainer');
        container.innerHTML = '';
        for(let i = 1; i <= 7; i++) {
            let childTemplate = '';
            if (data[i % 7]) {
                data[i % 7].forEach((item, index) => {
                    childTemplate += `<div class="bd-box" style="background-color: ${COLOR_LIST[index % 10]}">${getNameInitials(item.name)}</div>`
                });
            } else {
                childTemplate = `<div class="empty-cal"></div>`
            }
            let rowsCols = getRowsCols(data[i % 7] ? data[i % 7].length : 1);
            let countLabel = bdCountLabel(data[i % 7] ? data[i % 7].length : 0);
            let countEl = document.createElement('div');
            countEl.classList.add('bd-count-label');
            countEl.innerText = countLabel;
            let bdBox = document.createElement('div');
            bdBox.setAttribute("style", `display:grid; ${rowsCols}`);
            bdBox.innerHTML = childTemplate;
            let headerEl = document.createElement('div');
            headerEl.classList.add('day-header');
            headerEl.innerText = DAY_MAP[i % 7].label;
            let dayEl = document.createElement('div');
            dayEl.classList.add('cal-day-body');
            dayEl.appendChild(headerEl);
            dayEl.appendChild(bdBox);
            dayEl.appendChild(countEl);
            container.appendChild(dayEl);
        }
    }
    return {
        'handleEvent': handleEvent,
        'driver': driver
    };
})();

module.driver();
