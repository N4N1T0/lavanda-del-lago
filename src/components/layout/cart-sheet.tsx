// UI Imports
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'

/**
 * Renders a sheet component with a trigger and content. The trigger is a child component passed as a prop.
 * The content includes a header with a title and description.
 *
 * @param {Object} props - The props object.
 * @param {React.ReactNode} props.children - The child component to be rendered as the trigger.
 * @return {JSX.Element} The rendered sheet component.
 */
const CartSheet = ({
	children,
}: { children: React.ReactNode }): JSX.Element => {
	// TODO: functionality
	// TODO: SWR-Local
	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Are you absolutely sure?</SheetTitle>
					<SheetDescription>
						This action cannot be undone. This will permanently delete your
						account and remove your data from our servers.
					</SheetDescription>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	)
}

export default CartSheet
