const axios = require('axios');

const colorSource = ()=> {
    // const bodyParser = require('body-parser');

    // const app = express();

    // app.use(bodyParser.json());
    // app.use(bodyParser.urlencoded({extended: false}));

    function randomInteger(max) {
        return Math.floor(Math.random()*(max + 1));
    }

    function newColor() {

        let r = randomInteger(255);
        let g = randomInteger(255);
        let b = randomInteger(255);
        return [r,g,b];
    }

    const sendColor = ()=> {
        // console.log('in sendColor')
        axios({
                method: 'POST',
                url: 'https://sci-fair-scum.herokuapp.com/color',
                // url: 'http://localhost:5000/color',
                data: newColor()
            })
        .then((res)=>{
            console.log(200);
        })
        .catch((err)=>{
            console.log('error!', err)
        });  

        setTimeout(()=>sendColor(), 1000);
    }
    sendColor();
}
// const PORT = process.env.PORT || 5001;

/** Listen * */
// app.listen(PORT, () => {
//     console.log(`Listening on port: ${PORT}`);
// });

exports.colorSource = colorSource();