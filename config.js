//global 설정, 서버, 메인 배경 등..
import {Platform} from 'react-native';
export default config = {
    // server: "http://13.125.225.253",
    server: "http://192.168.219.105",
    main_background_color1: "#009DDF",
    main_background_color2: "#0D43A4",
    main_background_color3: "#0A2570",
    shadow:{
        ...Platform.select({
            ios: {
                shadowColor: '#000000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.15,
                shadowRadius: 5,
            },
            android: {
                elevation: 5,
            },
        })
    },
};