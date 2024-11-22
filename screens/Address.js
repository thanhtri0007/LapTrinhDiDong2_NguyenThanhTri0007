import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const AddressScreen = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleAddAddress = () => {
    if (!selectedLocation) {
      Alert.alert('Cảnh báo', 'Vui lòng chọn một địa điểm.');
      return;
    }

    // Xử lý khi có địa chỉ được chọn (ví dụ: lưu vào database)
    console.log('Địa chỉ đã chọn:', selectedLocation);
    Alert.alert('Thành công', 'Địa chỉ đã được thêm thành công!');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Thêm địa chỉ mới</Text>

        {/* Bản đồ */}
        {selectedLocation && (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: selectedLocation.latitude,
              longitude: selectedLocation.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: selectedLocation.latitude,
                longitude: selectedLocation.longitude,
              }}
              title="Vị trí đã chọn"
            />
          </MapView>
        )}

        {/* Ô tìm kiếm địa chỉ từ Google Places API */}
        <GooglePlacesAutocomplete
          placeholder="Nhập địa chỉ"
          onPress={(data, details = null) => {
            setSelectedLocation({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
            });
          }}
          query={{
            key: 'KHÓA_API_GOOGLE_MAPS_CỦA_BẠN',
            language: 'vi',
          }}
          fetchDetails={true}
          enablePoweredByContainer={false}
          styles={{
            container: {
              flex: 0,
              marginTop: 10,
            },
            listView: {
              backgroundColor: 'white',
            },
          }}
        />
      </View>

      <Pressable
        onPress={handleAddAddress}
        style={styles.addButton}
      >
        <Text style={styles.addButtonText}>Thêm</Text>
      </Pressable>
    </ScrollView>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  header: {
    padding: 10,
  },
  headerText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  map: {
    height: 200,
    marginTop: 10,
  },
  addButton: {
    backgroundColor: '#FFC72C',
    padding: 19,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    fontWeight: 'bold',
  },
});
