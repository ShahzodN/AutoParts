import { Dropdown, DropdownMenuItemType, PrimaryButton } from "@fluentui/react/lib";

export function ProductFilters() {
    const options = [
        { key: '1', text: 'M', itemType: DropdownMenuItemType.Header },
        { key: '2', text: 'Mercedes-Benz' },
        { key: '3', text: 'Mazda', },
        { key: '4', text: 'B', itemType: DropdownMenuItemType.Header },
        { key: '5', text: 'BMW', }
    ];

    const numbers = [1, 2, 4, 5];

    return (
        <div className="d-flex flex-column shadow p-2">
            <Dropdown
                placeholder="Не выбрано"
                label="Категория"
                options={options}
                onChange={(e, selectedOptions) => console.log(selectedOptions)}
            />

            <Dropdown
                placeholder="Не выбрано"
                label="Производитель"
                multiSelect
                options={options}
                onChange={(e, selectedOptions) => console.log(selectedOptions)}
            />

            <Dropdown
                label="Модель"
                multiSelect
                options={options}
                onChange={(e, selectedOptions) => console.log(selectedOptions)}
            />

            <Dropdown
                label="Год выпуска от"
                options={numbers.map((v, i) => {
                    return { key: i, text: v, data: 'someids' };
                })}
                onChange={(e, selectedOptions) => console.log(selectedOptions)}
            />

            <Dropdown
                label="Год выпуска до"
                onChange={(e, selectedOptions) => console.log(selectedOptions)}
            />

            <Dropdown
                label="Тип кузова"
                onChange={(e, selectedOptions) => console.log(selectedOptions)}
            />

            <PrimaryButton
                text="Применить"
                className="mt-1"
            />
        </div>
    )
}