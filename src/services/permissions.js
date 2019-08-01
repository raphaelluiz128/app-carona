import {PermissionsAndroid} from 'react-native';


    export async function requestCamera() {
        const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Permissão para uso de câmera',
        message:
          'App carona preciso de sua permissão' +
          'para uso de sua câmera',
      },
   
)
};

export async function requestLocation() {
    const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Permissão para localização",
          message: "App carona precisa ter acesso a sua localização"
        }
      );
  };

  export async function requestCLocation() {
    const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        {
          title: "Permissão para curso de localização",
          message: "App carona precisa ter acesso ao curso de sua localização"
        }
      );
  };