export function FormInput(props: React.ComponentProps<'input'>) {
  return (
    <>
      <label className="sr-only" htmlFor={props.id}>
        {props.placeholder}
      </label>
      <input
        {...props}
        className="rounded-full bg-zinc-700 px-3.5 py-3 text-stone-200 select-none"
      />
    </>
  )
}
