import Select from "react-select";
import AsyncSelect from "react-select/async";
import modelService from "../services/model.service";
import { Button } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import productService from "../services/product.service";

export function ProductFilters({ data, setProducts }) {

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (window.location.search) {
      productService.getFilteredProducts(window.location.search).then(res => setProducts(res.data));
    }
  }, []);

  const loadModels = (value, callback) => {
    modelService.getModelsName(value).then(res => callback(res.data));
  }

  const filterData = () => {
    productService.getFilteredProducts(window.location.search).then(res => setProducts(res.data));
  }

  const categoryValues = () => {
    let array = [];

    if (searchParams.getAll("categories")?.length > 0) {
      const query = searchParams.getAll("categories");

      query.forEach(i => {
        const c = data.categories.find(c => c.id === parseInt(i));
        if (c)
          array.push({ value: c.id, label: c.name });
      });
    }

    return array;
  }

  const manufactorValues = () => {
    let array = [];

    if (searchParams.getAll("manufactors")?.length > 0) {
      const query = searchParams.getAll("manufactors");

      query.forEach(i => {
        const c = data.manufactors.find(c => c.id === parseInt(i));
        if (c)
          array.push({ value: c.id, label: c.name });
      });
    }

    return array;
  }

  const modelsValues = () => {
    let array = [];

    if (searchParams.getAll("models")?.length > 0) {
      const query = searchParams.getAll("models");

      query.forEach(i => {
        array.push({ value: i, label: i });
      });
    }

    return array;
  }

  const onCategoryChange = (newValue) => {
    setSearchParams({
      manufactors: searchParams.getAll("manufactors"),
      categories: newValue.map(item => item.value),
      models: searchParams.getAll("models"),
      yearFrom: searchParams.getAll("yearFrom"),
      yearTo: searchParams.getAll("yearTo"),
      priceFrom: searchParams.getAll("priceFrom"),
      priceTo: searchParams.getAll("priceTo")
    });
  }

  const onManufactorChange = (newValue) => {
    setSearchParams({
      manufactors: newValue.map(item => item.value),
      categories: searchParams.getAll("categories"),
      models: searchParams.getAll("models"),
      yearFrom: searchParams.getAll("yearFrom"),
      yearTo: searchParams.getAll("yearTo"),
      priceFrom: searchParams.getAll("priceFrom"),
      priceTo: searchParams.getAll("priceTo")
    });
  }

  const onModelsChange = (newValue) => {
    setSearchParams({
      manufactors: searchParams.getAll("manufactors"),
      categories: searchParams.getAll("categories"),
      models: newValue.map(item => item.value),
      yearFrom: searchParams.getAll("yearFrom"),
      yearTo: searchParams.getAll("yearTo"),
      priceFrom: searchParams.getAll("priceFrom"),
      priceTo: searchParams.getAll("priceTo")
    });
  }

  const onYearFromChange = (newValue) => {
    let params = {
      manufactors: searchParams.getAll("manufactors"),
      categories: searchParams.getAll("categories"),
      models: searchParams.getAll("models"),
      yearFrom: [newValue],
      yearTo: searchParams.getAll("yearTo"),
      priceFrom: searchParams.getAll("priceFrom"),
      priceTo: searchParams.getAll("priceTo")
    }

    if (!newValue)
      delete params.yearFrom;

    setSearchParams(params);
  }

  const onYearToChange = (newValue) => {
    let params = {
      manufactors: searchParams.getAll("manufactors"),
      categories: searchParams.getAll("categories"),
      models: searchParams.getAll("models"),
      yearFrom: searchParams.getAll("yearFrom"),
      yearTo: [newValue],
      priceFrom: searchParams.getAll("priceFrom"),
      priceTo: searchParams.getAll("priceTo")
    }

    if (!newValue)
      delete params.yearTo;

    setSearchParams(params);
  }

  const onPriceFromChange = (newValue) => {
    let params = {
      manufactors: searchParams.getAll("manufactors"),
      categories: searchParams.getAll("categories"),
      models: searchParams.getAll("models"),
      yearFrom: searchParams.getAll("yearFrom"),
      yearTo: searchParams.getAll("yearTo"),
      priceFrom: [newValue],
      priceTo: searchParams.getAll("priceTo")
    }

    if (!newValue)
      delete params.priceFrom;

    setSearchParams(params);
  }

  const onPriceToChange = (newValue) => {
    let params = {
      manufactors: searchParams.getAll("manufactors"),
      categories: searchParams.getAll("categories"),
      models: searchParams.getAll("models"),
      yearFrom: searchParams.getAll("yearFrom"),
      yearTo: searchParams.getAll("yearTo"),
      priceFrom: searchParams.getAll("priceFrom"),
      priceTo: [newValue]
    }
    if (!newValue)
      delete params.priceTo;

    setSearchParams(params);
  }

  return (
    <div className="d-flex flex-column shadow p-2">
      <Select
        placeholder="Категории"
        isMulti
        closeMenuOnSelect={false}
        options={data.categories.map(item => ({ value: item.id, label: item.name }))}
        onChange={onCategoryChange}
        value={categoryValues()}
      />

      <Select
        placeholder="Производители"
        isMulti
        closeMenuOnSelect={false}
        options={data.manufactors.map(item => ({ value: item.id, label: item.name }))}
        onChange={onManufactorChange}
        value={manufactorValues()}
        className="mt-2"
      />

      <AsyncSelect
        cacheOptions
        placeholder="Модели"
        isMulti
        closeMenuOnSelect={false}
        loadOptions={loadModels}
        onChange={onModelsChange}
        value={modelsValues()}
        className="mt-2"
      />

      <div className="d-flex mt-2">
        <input
          className="form-control me-2"
          placeholder="Год выпуска (от)"
          value={searchParams.getAll("yearFrom")[0] || ""}
          onChange={e => onYearFromChange(e.target.value)}
        />
        <input
          className="form-control"
          placeholder="Год выпуска (до)"
          value={searchParams.getAll("yearTo")[0] || ""}
          onChange={e => onYearToChange(e.target.value)}
        />
      </div>

      <div className="d-flex mt-2">
        <input
          placeholder="Цена от"
          className="form-control me-2"
          value={searchParams.getAll("priceFrom")[0] || ""}
          onChange={e => onPriceFromChange(e.target.value)}
        />
        <input
          placeholder="Цена до"
          className="form-control"
          value={searchParams.getAll("priceTo")[0] || ""}
          onChange={e => onPriceToChange(e.target.value)}
        />
      </div>

      <Button
        variant="outline-primary"
        onClick={() => filterData()}
        className="mt-2"
      >
        Применить
      </Button>

      <Button
        variant="outline-dark"
        onClick={() => setSearchParams({})}
        className="mt-2"
      >
        Сбросить
      </Button>
    </div>
  )
}