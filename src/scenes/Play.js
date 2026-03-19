class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    preload() {
        this.load.path = './assets/'
        this.load.image('background', 'background.jpg')
        this.load.image('postitnote', '250x250postitnote.png')
        this.load.image('day', '150x150day.png')
        this.load.image('night', '150x150night.png')
        this.load.image('comforteat', 'comforteat.png')
        this.load.image('study', 'study.png')
        this.load.image('workout', 'workout.png')
        this.load.image('bedrot', 'bedrot.png')
        this.load.image('studyfailure', 'studyfailure.png')
        this.load.image('smallinjury', 'smallinjury.png')
        this.load.image('biginjury', 'biginjury.png')
        this.load.image('bingeeat', 'bingeeat.png')
        this.load.image('doomscroll', 'doomscroll.png')
        this.load.image('laundry', 'laundry.png')
        this.load.image('gethomeandcrash', 'gethomeandcrash.png')

        this.load.spritesheet('mentalhealth', '250x50mentalhealthbar.png', {
            frameWidth: 250,
            frameHeight: 50,
        })
        this.load.spritesheet('physicalhealth', '250x50physicalhealthbar.png', {
            frameWidth: 250,
            frameHeight: 50,
        })
        this.load.spritesheet('exampreparedness', '250x50prepbar.png', {
            frameWidth: 250,
            frameHeight: 50,
        })
        this.load.spritesheet('button1', '200x100button1.png', {
            frameWidth: 200,
            frameHeight: 100,
        })
        this.load.spritesheet('button2', '200x100button2.png', {
            frameWidth: 200,
            frameHeight: 100,
        })
        this.load.spritesheet('button3', '200x100button3.png', {
            frameWidth: 200,
            frameHeight: 100,
        })
        this.load.spritesheet('button4', '200x100button4.png', {
            frameWidth: 200,
            frameHeight: 100,
        })
        this.load.spritesheet('daytonight', '150x150daytonightspritesheet.png', {
            frameWidth: 150,
            frameHeight: 150,
        })
        this.load.spritesheet('nighttoday', '150x150nighttodayspritesheet.png', {
            frameWidth: 150,
            frameHeight: 150,
        })
    }

    create() {
        this.textconfig = {
            fontFamily: 'Handwriting',
            fontSize: '35px',
            color: '#727272',
            padding: {
                top: 5,
                bottom: 5,
                right: 15
            },
        }

        this.eventTitleConfig = {
            fontFamily: 'Handwriting',
            fontSize: '32px',
            color: '#222222',
            align: 'center',
            wordWrap: { width: 500 }
        }

        this.eventBodyConfig = {
            fontFamily: 'Handwriting',
            fontSize: '22px',
            color: '#333333',
            align: 'center',
            wordWrap: { width: 500 }
        }

        this.eventButtonConfig = {
            fontFamily: 'Handwriting',
            fontSize: '20px',
            color: '#222222',
            align: 'center',
            wordWrap: { width: 150 }
        }

        this.add.text(-1000, -1000, '.', { fontFamily: 'Handwriting' })

        document.fonts.ready.then(() => {
            this.add.text(120, 80, 'Mental Health:', this.textconfig)
            this.add.text(450, 80, 'Physical Health:', this.textconfig)
            this.add.text(230, 260, 'Exam Preparedness:', this.textconfig)
            this.add.text(577, 180, 'All work and \nno play makes \nJack a dull boy', this.textconfig)
        })

        this.background = this.add.tileSprite(0, 0, 800, 600, 'background').setOrigin(0).setDepth(0)
        this.postitnote = this.add.tileSprite(550, 169, 250, 250, 'postitnote').setOrigin(0).setDepth(0)

        this.mentalhealth = this.add.sprite(230, 151, 'mentalhealth', 0)
        this.physicalhealth = this.add.sprite(570, 151, 'physicalhealth', 0)
        this.exampreparedness = this.add.sprite(360, 327, 'exampreparedness', 0)
        this.button1 = this.add.sprite(280, 450, 'button1', 0).setInteractive()
        this.button2 = this.add.sprite(570, 450, 'button2', 0).setInteractive()
        this.button3 = this.add.sprite(280, 550, 'button3', 0).setInteractive()
        this.button4 = this.add.sprite(570, 550, 'button4', 0).setInteractive()

        this.mentalhealthvalue = 0
        this.physicalhealthvalue = 0
        this.exampreparednessvalue = 0
        this.eventActive = false
        this.currentEvent = null

        this.randomEvents = [
            // Positive Events
            {
                
            },
            {

            },
            {

            },
            {

            },
            {
                key: 'positive_5',
                title: 'Play Test!',
                body: 'One of the design teams in your program is playtesting a new game - "The Hit SlopstarZ video game: the Slopstar 2: Civil Slop."',
                options: [
                    { text: 'Woah, the dev console is a game mechanic?', mental: 1, physical: 1, prep: 1 },
                    { text: 'AND it\'s multiplayer?', mental: 1, physical: 1, prep: 1 },
                    { text: 'AND it\'s peak slop?', mental: 1, physical: 1, prep: 1 },
        
                ]
            },
            // Trade-off Events
            {
                key: 'tradeoff_1',
                title: 'Comfort Eating',
                body: 'On one hand... you\'ve already eaten plenty today. On the other hand... you\'re just fueling your brain, right? With ice cream?',
                options: [
                    { text: 'No. Focus! I need to study.', mental: 0, physical: -1, prep: 1 },
                    { text: 'How about some soup instead?', mental: 1, physical: 1, prep: -1 },
                    { text: 'Oooh, ice cream!', mental: 1, physical: -1, prep: -1 }
                ]
            },
            {
                key: 'tradeoff_2',
                title: 'Out on the Town',
                body: 'Your friends are suffering right alongside you, and they invite you to go out for a night of relaxing. You say...',
                options: [
                    { text: 'No. I need to study.', mental: -1, physical: 0, prep: 2 },
                    { text: 'WOOOOOOO! LET\'S PARTY BABYYYYY!', mental: 3, physical: -1, prep: -2 },
                    { text: 'Maybe just a short walk?', mental: 0, physical: 1, prep: 0 }
                ]
            },
            {
                key: 'tradeoff_3',
                title: 'Study Session with a Friend',
                body: 'A friend invites you to a study with them. You walk into the door and say...',
                options: [
                    { text: 'I hope you\'re better at discrete math than I am.', mental: -1, physical: 0, prep: 1 },
                    { text: 'I need a break. Up for some games?', mental: 1, physical: 0, prep: -1 },
                    { text: '...why are you looking at me that way?', mental: 2, physical: 1, prep: -2 }
                ]
            },
            {
                key: 'tradeoff_4',
                title: 'Passion Project',
                body: 'For once, a project you\'ve been assigned is actually something you care about. Being a completely reasonable person, you say...',
                options: [
                    { text: 'I can\'t get TOO carried away...', mental: 0, physical: 0, prep: 1 },
                    { text: 'Might as well have some fun with it!', mental: 1, physical: 1, prep: -1 },
                    { text: 'What even is 14 hours in the grand scheme of things?', mental: -2, physical: -2, prep: 4 }
                ]
            },
            {
                key: 'tradeoff_5',
                title: 'A Call from Home',
                body: 'It\'s been a while since you last talked to your family - or to anyone, really. You finally pick up their call and say...',
                options: [
                    { text: 'Honestly? Things are kinda tough, but I\'m managing.', mental: 1, physical: 0, prep: -1 },
                    { text: 'I benched 240 at the gym today!', mental: 0, physical: 1, prep: -1 },
                    { text: 'I don\'t have time right now. Do I ever have time?', mental: -1, physical: -1, prep: 1 }
                ]
            },
            // Negative Events
            {
                key: 'negative_1',
                title: 'A Fight between Friends',
                body: 'Two of your friends are having a heated argument about something trivial. You try to mediate, but it quickly escalates. You say...',
                options: [
                    { text: 'Fuck this, this isn\'nt worth it.', mental: -2, physical: 0, prep: 1 },
                    { text: 'Let\'s just fight. Winner is right.', mental: 0, physical: 1, prep: -2 },
                    { text: 'JUST SHUT UP! BOTH OF YOU!', mental: 1, physical: -2, prep: 0 },
                ]
            },
            {
                key: 'negative_2',
                title: 'A Rough Day',
                body: 'Everything seems to be going wrong today. You feel overwhelmed and exhausted. You say...',
                options: [
                    { text: 'I wish I could take a break...', mental: -1, physical: 0, prep: 0 },
                    { text: 'God, what a headache...', mental: 0, physical: -1, prep: 0 },
                    { text: 'That\'s it. Naptime.', mental: 0, physical: 0, prep: -1 }
                ]
            },
            {
                key: 'negative_3',
                title: 'Reasonable Crash Out',
                body: 'On top of everything else, now there\'s some other bullshit you have to deal with. You respond...',
                options: [
                    { text: 'Why me?!', mental: -2, physical: 0, prep: 0 },
                    { text: 'I\'ll only need another six hours to fix this too...', mental: 0, physical: -2, prep: 0 },
                    { text: 'Nah, fuck this.', mental: 0, physical: 0, prep: -2 }
                ]

            },
            {},
            {},
        ]

        this.createRandomEventOverlay()

        this.button1.on('pointerover', () => {
            this.button1.setFrame(1)
        })
        this.button1.on('pointerout', () => {
            this.button1.setFrame(0)
        })
        this.button2.on('pointerover', () => {
            this.button2.setFrame(1)
        })
        this.button2.on('pointerout', () => {
            this.button2.setFrame(0)
        })
        this.button3.on('pointerover', () => {
            this.button3.setFrame(1)
        })
        this.button3.on('pointerout', () => {
            this.button3.setFrame(0)
        })
        this.button4.on('pointerover', () => {
            this.button4.setFrame(1)
        })
        this.button4.on('pointerout', () => {
            this.button4.setFrame(0)
        })

        this.button1.on('pointerdown', () => {
            if (this.eventActive) return
            this.applyStatChange('mental', -1)
        })

        this.button2.on('pointerdown', () => {
            if (this.eventActive) return
            this.applyStatChange('mental', 1)
        })

        this.button3.on('pointerdown', () => {
            if (this.eventActive) return
            this.applyStatChange('physical', -1)
        })

        this.button4.on('pointerdown', () => {
            if (this.eventActive) return
            this.applyStatChange('physical', 1)
        })

        this.input.keyboard.on('keydown-R', () => {
            if (!this.eventActive) {
                this.showRandomEvent()
            }
        })
    }

    createRandomEventOverlay() {
        this.eventOverlay = this.add.container(0, 0).setDepth(100).setVisible(false)

        this.eventDimmer = this.add.rectangle(400, 300, 800, 600, 0x000000, 0.6)
            .setInteractive()

        this.eventPanel = this.add.rectangle(400, 300, 620, 430, 0xf4e7b5, 1)
            .setStrokeStyle(4, 0x8f7a4f, 1)

        this.eventImage = this.add.image(400, 165, 'comforteat')
            .setDisplaySize(150, 150)

        this.eventTitle = this.add.text(400, 255, '', this.eventTitleConfig).setOrigin(0.5)

        this.eventBody = this.add.text(400, 315, '', this.eventBodyConfig).setOrigin(0.5)

        this.eventOptionButtons = []
        this.eventOptionLabels = []

        const buttonY = 465
        const buttonXPositions = [220, 400, 580]

        for (let i = 0; i < 3; i++) {
            const button = this.add.sprite(buttonXPositions[i], buttonY, 'button1', 0)
                .setInteractive()

            const label = this.add.text(buttonXPositions[i], buttonY, `Option ${i + 1}`, this.eventButtonConfig)
                .setOrigin(0.5)

            button.on('pointerover', () => {
                button.setFrame(1)
            })

            button.on('pointerout', () => {
                button.setFrame(0)
            })

            button.on('pointerdown', () => {
                this.handleEventOption(i)
            })

            this.eventOptionButtons.push(button)
            this.eventOptionLabels.push(label)
        }

        this.eventOverlay.add([
            this.eventDimmer,
            this.eventPanel,
            this.eventImage,
            this.eventTitle,
            this.eventBody,
            ...this.eventOptionButtons,
            ...this.eventOptionLabels
        ])
    }

    showRandomEvent() {
        const eventData = Phaser.Utils.Array.GetRandom(this.randomEvents)
        this.currentEvent = eventData
        this.eventActive = true

        this.eventImage.setTexture(eventData.key)
        this.eventTitle.setText(eventData.title)
        this.eventBody.setText(eventData.body)

        for (let i = 0; i < 3; i++) {
            this.eventOptionLabels[i].setText(eventData.options[i].text)
        }

        this.eventOverlay.setVisible(true)
    }

    hideRandomEvent() {
        this.eventActive = false
        this.currentEvent = null
        this.eventOverlay.setVisible(false)
    }

    applyStatChange(statName, amount) {
        if (statName === 'mental') {
            this.mentalhealthvalue = Phaser.Math.Clamp(
                this.mentalhealthvalue + amount,
                0,
                this.mentalhealth.texture.frameTotal - 1
            )
            this.mentalhealth.setFrame(this.mentalhealthvalue)
            return
        }

        if (statName === 'physical') {
            this.physicalhealthvalue = Phaser.Math.Clamp(
                this.physicalhealthvalue + amount,
                0,
                this.physicalhealth.texture.frameTotal - 1
            )
            this.physicalhealth.setFrame(this.physicalhealthvalue)
            return
        }

        if (statName === 'prep') {
            this.exampreparednessvalue = Phaser.Math.Clamp(
                this.exampreparednessvalue + amount,
                0,
                this.exampreparedness.texture.frameTotal - 1
            )
            this.exampreparedness.setFrame(this.exampreparednessvalue)
        }
    }

    handleEventOption(optionIndex) {
        if (!this.currentEvent) return

        const selectedOption = this.currentEvent.options[optionIndex]
        if (!selectedOption) return

        this.applyStatChange('mental', selectedOption.mental || 0)
        this.applyStatChange('physical', selectedOption.physical || 0)
        this.applyStatChange('prep', selectedOption.prep || 0)

        console.log(
            `Selected option ${optionIndex + 1} for ${this.currentEvent.title}:`,
            selectedOption
        )

        this.hideRandomEvent()
    }

    update() {
    }
}