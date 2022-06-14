import { Component } from "react/cjs/react.production.min";

export default class FireBaseStub extends Component {

    getUserIpptScoreStub = () => {

        var RandomNumber = Math.floor(Math.random() * 100) + 0;
        
        // console.log(RandomNumber);
        return RandomNumber
    }

    logoutUserStub = () => {

        console.log("Logging out from firebase")
        // does nothing
    }
}
