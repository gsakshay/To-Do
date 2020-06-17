

const getDate = () =>{
    
    const today = new Date();
    const options = {
    weekday: "long",
    year: "numeric",
    day: "numeric",
    };
    return today.toLocaleDateString("en-US", options);
    
}

module.exports = getDate;

