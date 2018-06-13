const statusHelper = (items, requestStatus) => {   
    
    let active = items.filter((item) => {
        return item.status == 'active';
    });
    let inactive = items.filter((item) => {
        return item.status == 'inactive';
    });
    const statusActive = [
        {name: 'all', value: 'all', count: items.length, link: '#', class: 'default'},
        {name: 'active', value: 'active', count: active.length, link: '#', class: 'default'},
        {name: 'inactive', value: 'inactive', count: inactive.length , link: '#', class: 'default'}
    ];

    statusActive.map((item) => {   
        if(requestStatus === item.name) {
            item.class = 'success';
        }               
    });
    
    return statusActive;
}

module.exports = {
    statusHelper: statusHelper
}