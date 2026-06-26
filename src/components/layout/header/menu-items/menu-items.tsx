import { observer } from 'mobx-react-lite';
import { standalone_routes } from '@/components/shared';
import { localize } from '@deriv-com/translations';
import { MenuItem, Text } from '@deriv-com/ui';
import { LegacyHomeNewIcon } from '@deriv/quill-icons/Legacy';

export const MenuItems = observer(() => {
    return (
        <MenuItem
            as='a'
            href={standalone_routes.traders_hub}
            leftComponent={<LegacyHomeNewIcon iconSize='xs' />}
            className='app-header__menu'
        >
            <Text>{localize("Trader's Hub")}</Text>
        </MenuItem>
    );
});

export const TradershubLink = observer(() => {
    return null;
});

// Create a namespace for MenuItems to include TradershubLink
type MenuItemsType = typeof MenuItems & {
    TradershubLink: typeof TradershubLink;
};

// Assign TradershubLink to MenuItems
(MenuItems as MenuItemsType).TradershubLink = TradershubLink;

export default MenuItems as MenuItemsType;
