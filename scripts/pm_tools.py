from todoist_api_python.api import TodoistAPI
import click


PROJECT_ID="6fFgj2HCJ5VcffGg"
TO_DO_SECTION_ID="6fFgj3684v6Mcgh8"
API_TOKEN="28f36da1ef703d6073855a27f549ed5334976aef"
DONE_SECTION_ID="6fFgj48grCwm35f8"


@click.group()
def cli():
    """
    CLI Tool for CI/CD
    """
    pass

@cli.command()
@click.argument("task_id")
def finish(task_id):
    """
    Method moves task from one column to  another
    """
    api = TodoistAPI(API_TOKEN)
    click.echo(f"Moving Task({task_id}) to DONE")
    api.move_task(task_id, project_id=PROJECT_ID, section_id=DONE_SECTION_ID)

@cli.command()
@click.argument("title")
def create(title):
    """
    Method creates a task
    """
    api = TodoistAPI(API_TOKEN)
    click.echo(f"Creating Task with ID - {title}")
    api.add_task(content=title, project_id=PROJECT_ID, section_id=TO_DO_SECTION_ID)

@cli.command()
@click.argument("task_id")
@click.argument("labels", nargs=-1)
def label(task_id, labels):
    """
    Add one or more labels to a Todoist task.    
    """
    api = TodoistAPI(API_TOKEN)
    click.echo(f"Task ID: {task_id}")
    click.echo(f"Labels: {labels}")
    try:
        api.update_task(task_id=task_id, labels=list(labels))
        click.echo("Labels added successfully!")
    except Exception as e:
        click.echo(f"Error: {e}")

if __name__ == "__main__":
    cli()
