import {   
    YearChooseBox,
    } from '../style';
import React from 'react';
import { setBirth } from '../utils/SignUpFormUtils';
import DropDownPicker from 'react-native-dropdown-picker';
import { useState,useEffect } from 'react';
import { Year } from '../types';
import { Dispatch, SetStateAction } from 'react'; 
import { SignUpFormState } from '../types';

interface InputUserBirthProps {
    setFormData: Dispatch<SetStateAction<SignUpFormState>>;
  }
export const InputUserBirth: React.FC<InputUserBirthProps> = ({setFormData}) => {
    //출생년도 선택을 위한 상태
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<number>(new Date().getFullYear());
    const [items, setItems] = useState<Year[]>([]);

    useEffect(() => {
        const options : Year[] = [];
        for (let year = value; year >= value - 100; year--) {
          options.push({ label: year.toString(), value: year });
        }
        setItems(options);
      }, []);

    useEffect(() => {
        setBirth(setFormData,value);
    }, [value]);

    return (
        <>
            <YearChooseBox>
                        <DropDownPicker
                            open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                            placeholder="출생년도 선택"
                            style={{
                                backgroundColor: '#fff',
                                borderColor: 'white',
                                borderWidth: 1,
                                borderRadius: 0,
                                marginBottom: 10,
                                borderBottomColor : '#000',
                              }}
                            containerStyle={{
                                borderRadius: 0,
                                marginBottom: 20,
                            }}
                            dropDownContainerStyle={{
                                backgroundColor: "#fff"
                              }}
                            
                        />
                    </YearChooseBox>    
        </>
    );
}