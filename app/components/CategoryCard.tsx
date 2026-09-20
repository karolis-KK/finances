import type { Category } from "@/types/finance";

export default function CategoryCard(props: {categories: Category[]}) {
    return (
        <div>
            <ul>
                {props.categories.map((category) => 
                    <li key={category.id}>{category.name}</li>
                )}
            </ul>
        </div>
    )
}