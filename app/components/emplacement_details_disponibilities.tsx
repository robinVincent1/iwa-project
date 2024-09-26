import { Text, View, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Calendar, LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales['fr'] = {
    monthNames: [
      'Janvier',
      'Février',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juillet',
      'Août',
      'Septembre',
      'Octobre',
      'Novembre',
      'Décembre'
    ],
    monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
    dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
    today: "Aujourd'hui"
  };
  
  LocaleConfig.defaultLocale = 'fr';
  

export default function EmplacementDetailsDisponibilities() {
    const [isCalendarVisible, setCalendarVisible] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date().toISOString().split('T')[0].slice(0, 7)); // Format YYYY-MM

    const toggleCalendar = () => {
        setCalendarVisible(!isCalendarVisible);
    };

    const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>Disponibilité</Text>
                <Text style={styles.text}>Vous n'avez pas encore sélectionné de dates</Text>
            </View>
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={toggleCalendar}>
                    <Ionicons name="calendar" size={33} color="black" />
                </TouchableOpacity>
            </View>
            <Modal
                visible={isCalendarVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={toggleCalendar}
            >
                <View style={styles.modalContainer}>
                    <Calendar
                        minDate={today}
                        markingType={'period'}
                        disableArrowLeft={currentMonth <= today.slice(0, 7)}
                        onDayPress={(day) => {
                            console.log('selected day', day);
                            toggleCalendar();
                        }}
                        onMonthChange={(month) => {
                            setCurrentMonth(month.dateString.slice(0, 7));
                        }}
                    />
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
    },
    textContainer: {
        flex: 1,
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    title: {
        fontSize: 24, // Augmente la taille du texte
        marginHorizontal: 10, // Ajoute une marge horizontale de 10
        fontWeight: 'bold', // Met le texte en gras
    },
    text: {
        fontSize: 16,
        marginHorizontal: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});