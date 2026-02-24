const Header = (props) => <h1>{props.course}</h1>

const Content = (props) => (
  console.log(props.parts),
  <div>
    {props.parts.map(part => <Part key={part.id} part={part} />)}
  </div>
)

const Part = (props) => (
  console.log(props.part),
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = (props) => <p>Total of {props.total} exercises</p>


const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={course.parts.reduce((sum, part) => sum + part.exercises, 0)} />
    </div>
  )
}

export default Course