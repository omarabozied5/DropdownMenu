import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import categoriesData from '../menu.json';

const DropdownMenu = () => {
  const [category, setCategory] = useState(null);
  const [subcategory, setSubcategory] = useState(null);
  const [subSubcategory, setSubSubcategory] = useState(null);

  const [openCategory, setOpenCategory] = useState(false);
  const [openSubcategory, setOpenSubcategory] = useState(false);
  const [openSubSubcategory, setOpenSubSubcategory] = useState(false);

  const categoryOptions = categoriesData.map(cat => ({
    label: cat.name,
    value: cat.id,
  }));

  const [subcategoryOptions, setSubcategoryOptions] = useState([]);
  const [subSubcategoryOptions, setSubSubcategoryOptions] = useState([]);

  const handleCategoryChange = selectedCategoryId => {
    const selectedCategory = categoriesData.find(
      cat => cat.id === selectedCategoryId,
    );
    setCategory(selectedCategory);
    setSubcategory(null);
    setSubSubcategory(null);

    setSubcategoryOptions(
      selectedCategory?.subcategories?.map(sub => ({
        label: sub.name,
        value: sub.id,
      })) || [],
    );
    setSubSubcategoryOptions([]);
  };

  const handleSubcategoryChange = selectedSubcategoryId => {
    const selectedSubcategory = category?.subcategories?.find(
      sub => sub.id === selectedSubcategoryId,
    );
    setSubcategory(selectedSubcategory);
    setSubSubcategory(null);

    setSubSubcategoryOptions(
      selectedSubcategory?.subcategories?.map(subSub => ({
        label: subSub.name,
        value: subSub.id,
      })) || [],
    );
  };

  const handleReset = () => {
    setCategory(null);
    setSubcategory(null);
    setSubSubcategory(null);
    setSubcategoryOptions([]);
    setSubSubcategoryOptions([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Category</Text>

      <DropDownPicker
        open={openCategory}
        value={category?.id || null}
        items={categoryOptions}
        setOpen={setOpenCategory}
        setValue={callback => {
          const value = callback(category?.id || null);
          handleCategoryChange(value);
        }}
        placeholder="Select Category"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
      />

      {subcategoryOptions.length > 0 && (
        <DropDownPicker
          open={openSubcategory}
          value={subcategory?.id || null}
          items={subcategoryOptions}
          setOpen={setOpenSubcategory}
          setValue={callback => {
            const value = callback(subcategory?.id || null);
            handleSubcategoryChange(value);
          }}
          placeholder="Select Subcategory"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
        />
      )}

      {subSubcategoryOptions.length > 0 && (
        <DropDownPicker
          open={openSubSubcategory}
          value={subSubcategory?.id || null}
          items={subSubcategoryOptions}
          setOpen={setOpenSubSubcategory}
          setValue={callback => {
            const value = callback(subSubcategory?.id || null);
            setSubSubcategory(
              subcategory?.subcategories?.find(sub => sub.id === value) || null,
            );
          }}
          placeholder="Select Sub-subcategory"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
        />
      )}

      <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
        <Text style={styles.resetText}>Reset</Text>
      </TouchableOpacity>

      <View style={styles.selectedItems}>
        <Text style={styles.selectedText}>
          Selected Category: {category?.name || 'None'}
        </Text>
        <Text style={styles.selectedText}>
          Selected Subcategory: {subcategory?.name || 'None'}
        </Text>
        <Text style={styles.selectedText}>
          Selected Sub-subcategory: {subSubcategory?.name || 'None'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  dropdown: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  dropdownContainer: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
  },
  resetButton: {
    marginTop: 20,
    backgroundColor: '#ff4d4d',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  resetText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedItems: {
    marginTop: 30,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  selectedText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
});

export default DropdownMenu;
