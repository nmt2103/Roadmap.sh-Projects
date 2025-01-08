const username = process.argv.slice(2)[0]
const GitHubApi = `https://api.github.com/users/${username}/events`

// Check if username is provided
if (!username) {
  console.log('Please provide GitHub username!')
  process.exit(1)
}

// Fetch GitHub's API
const fetchUserActivity = async (api) => {
  return await (await fetch(api)).json()
}

async function app() {
  try {
    // Revoke GitHub's API
    const activities = await fetchUserActivity(GitHubApi)

    // Check if username valid
    if (!Array.isArray(activities) && activities.status === '404')
      return console.error(
        `${activities.status} - Username ${username} ${activities.message}!`
      )

    // Check if user's GitHub is active
    if (!activities.length) return console.log('No recent activity found!')

    activities.forEach((activity) => {
      switch (activity.type) {
        case 'WatchEvent':
          console.log(`- Watched ${activity.repo.name}`)
          break

        case 'PushEvent':
          console.log(
            `- Pushed ${activity.payload.size} commit(s) to ${activity.repo.name}`
          )
          break

        case 'IssuesEvent':
          console.log(`- Issued an issue in ${activity.repo.name}`)
          break

        case 'ForkEvent':
          console.log(`- Forked ${activity.repo.name}`)
          break

        case 'CreateEvent':
          console.log(
            `- Created ${activity.payload.ref_type} in ${activity.repo.name}`
          )
          break

        case 'DeleteEvent':
          console.log(
            `- Deleted ${activity.payload.ref_type} in ${activity.repo.name}`
          )
          break

        default:
          console.log(`- ${activity.type} in ${activity.repo.name}`)
          break
      }
    })
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}
app()
