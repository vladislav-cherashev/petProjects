const DB = require( './db.json' );
const { saveToDatabase } = require( './utils' );
const res = require( 'express/lib/response' );

const getAllHabits = () => {
    return DB.habits;
};

const createNewHabit = ( newHabit ) => {
    const isAlreadyAdded =
        DB.habits.findIndex(
            ( habit ) => habit.name === newHabit.name
        ) > -1;
    if( isAlreadyAdded ) {
        return;
    }
    DB.habits.push( newHabit );
    saveToDatabase( DB );
    return newHabit;
};

const getOneHabit = ( habitId ) => {
    const habit = DB.habits.find( habit => {
        return habit.id === habitId;
    } );
    if( !habit ) {
        return res.send( 'habit not found' );
    }
    return habit;
}

const updateOneHabit = ( habitId, changes ) => {
    const indexForUpdate = DB.habits.findIndex(
        ( habit ) => habit.id === habitId
    );
    if( indexForUpdate === -1 ) {
        return res.send( 'habit not found' );
    }
    const updatedWorkout = {
        ...DB.habits[ indexForUpdate ],
        ...changes,
        updatedAt: new Date().toLocaleString( 'en-US', {
            timeZone: 'UTC',
        } ),
    };
    DB.habits[ indexForUpdate ] = updatedWorkout;
    saveToDatabase( DB );
    return updatedWorkout;
};

const deleteOneHabit = ( habitId ) => {
    const indexForDeletion = DB.habits.findIndex(
        ( habit ) => habit.id === habitId
    );
    if( indexForDeletion === -1 ) {
        return res.send( 'habit not found' );
    }
    DB.habits.splice( indexForDeletion, 1 );
    saveToDatabase( DB );
};

module.exports = { getAllHabits, createNewHabit, getOneHabit, updateOneHabit, deleteOneHabit };