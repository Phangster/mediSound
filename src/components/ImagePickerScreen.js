import React, { Component } from 'react';
import {
    Image,
    Text,
    TouchableNativeFeedback,
    TouchableOpacity,
    View,
    Platform
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Ocr, { LANG_ENGLISH } from 'react-native-tesseract-ocr';

const Button = (Platform.OS === 'andriod') ? TouchableNativeFeedback : TouchableOpacity;

const imagePickerOptions = {
    quailty: 1.0,
    storageOptions: {
        skipBackup: true,
    },
};

const tessOptions = {};

export default class ImagePickerScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageSource: null,
            text: ''
        };
        this.selectImage = this.selectImage.bind(this);
    }

    selectImage(){
        ImagePicker.showImagePicker(imagePickerOptions, (response) => {
            if(!response.didCancel){
                const source = {uri: response.uri};
                this.setState({ imageSource: source})
                this.extractText(response.path);
                console.log(this.imageSource)
            }
        })
    }

    extractText(imgPath){
        Ocr.recognize(imgPath, LANG_ENGLISH, tessOptions)
        .then((res) => { console.log(res), this.setState({ text: res})});
    }

    render(){
        const { imageSource } = this.state;
        return(
            <View>
                <Button onPress={this.selectImage}>
                    <View>{imageSource === null ? <Text>Tap me!</Text> : <Image style={{width: 450, height: 300}} source = {imageSource}/>}
                    </View>
                </Button>
                <View style={{justifyContent: "center",alignItems: "center"}}>
                <Text >{this.state.text}</Text>
                </View>
            </View>
            
        )
    }
}
