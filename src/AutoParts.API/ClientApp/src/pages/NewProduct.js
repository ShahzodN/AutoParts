import { ComboBox, DefaultButton, Image, ImageFit, PrimaryButton, TagPicker, TextField, Toggle } from "@fluentui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import noImage from "../assets/no-photo.png";
import productService from "../services/product.service";
import modelService from "../services/model.service";

export function NewProduct() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    price: 0,
    isEnabled: true,
    forAllManufactors: false,
    forAllModels: false,
    manufactorId: 0,
    models: [],
    categoryId: 0,
    description: '',
    image: noImage
  });

  const [data, setData] = useState({
    manufactors: [],
    categories: []
  });

  const [models, setModels] = useState([].map(item => ({ key: item.name, name: item.name, id: item.id })));

  const [errorMessages, setErrorMessages] = useState({
    priceError: '',
    nameError: ''
  });

  useEffect(() => {
    productService.getPreliminaryData().then(result => setData(result));
  }, []);

  const listContainsTagList = (tag, tagList) => {
    if (!tagList || !tagList.length || tagList.length === 0) {
      return false;
    }
    return tagList.some(compareTag => compareTag.key === tag.key);
  };

  const filterSuggestedTags = (filterText, tagList) => {
    return filterText
      ? models.filter(
        model => model.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0 && !listContainsTagList(model, tagList),
      )
      : [];
  };

  const getTextFromItem = (item) => item.name;

  const onFileUpload = (e) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      setForm({ ...form, image: e.target.result });
    }

    reader.readAsDataURL(e.target.files[0]);
  }

  const uploadProduct = () => {
    productService.create(form).then(res => console.log(res.ok));
    navigate('/admin/products');
  }

  return (
    <div className="container-fluid p-5">
      <div className="row mb-4">
        <div className="col-sm-12 col-md-3 col-lg-2">
          <Image
            imageFit={ImageFit.centerContain}
            width={200}
            height={200}
            alt="Product photo"
            src={form.image}
            className="border mb-2"
          />
          <input type="file" hidden id="productImage" onChange={(e) => onFileUpload(e)} />

          <div>
            <DefaultButton
              iconProps={{ iconName: "upload" }}
              text="Загрузить фото"
              onClick={(e) => { document.getElementById('productImage').click(); }}
            />
          </div>
        </div>
        <div className="col-sm-12 col-md-9 col-lg-10">
          <div className="row">
            <div className="col">
              <TextField
                placeholder="Название продукта"
                label="Обязательное поле"
                required
                onChange={(e, newValue) => setForm({ ...form, name: newValue })}
              />
            </div>
            <div className="col">
              <TextField
                placeholder="Цена"
                label="Обязательное поле"
                required
                errorMessage={errorMessages.priceError}
                onChange={(e, newValue) => setForm({ ...form, price: newValue })}
              />
            </div>
            <div className="col">
              <ComboBox
                required
                label="Обязательное поле"
                placeholder="Категория"
                autoComplete="on"
                options={data.categories.map(item => ({ key: item.name, text: item.name }))}
              />
            </div>
          </div>

          <Toggle
            label="Видно пользователям"
            defaultChecked={form.isEnabled}
            onChange={(e, checked) => setForm({ ...form, isEnabled: checked })}
          />

          <TextField
            placeholder="Описание"
            multiline
            onChange={(e, newValue) => setForm({ ...form, description: newValue })}
          />
        </div>
      </div>
      <h2>Совместимость</h2>
      <div className="row align-items-end">
        <div className="col-2">
          <ComboBox
            required
            disabled={form.forAllManufactors}
            label="Обязательное поле"
            placeholder="Производитель"
            autoComplete="on"
            options={data.manufactors.map(item => ({ key: item, text: item, id: item.id }))}
            onChange={(e, value) => {
              modelService.getAll(value.text).then(res => setModels(res));
              setForm({ ...form, manufactorId: value.id });
            }}
          />
        </div>
        <div className="col">
          <label htmlFor="modelPicker">Выберите модели которые совместимы с создоваемым продуктом</label>
          <TagPicker
            disabled={form.forAllModels || form.forAllManufactors}
            pickerSuggestionsProps={{ suggestionsHeaderText: "Доступные модели", noResultsFoundText: "Не найдено" }}
            getTextFromItem={getTextFromItem}
            onResolveSuggestions={filterSuggestedTags}
            inputProps={{ id: 'modelPicker' }}
            onChange={items => console.log(items)}
          />
        </div>
        <div className="row">
          <div className="col-3">
            <Toggle
              label="Совместим со всеми производителями"
              defaultChecked={false}
              onChange={(e, checked) => setForm({ ...form, forAllManufactors: checked })}
            />
          </div>
          <div className="col-2">
            <Toggle
              label="Совместим со всеми моделями"
              disabled={form.forAllManufactors}
              onChange={(e, checked) => setForm({ ...form, forAllModels: checked })}
            />
          </div>
        </div>
      </div>
      <PrimaryButton text="Save" onClick={() => uploadProduct()} />
    </div>
  )
}