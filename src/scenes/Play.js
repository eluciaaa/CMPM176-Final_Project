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
        this.load.image('positive_1', 'goodgrade.png')
        this.load.image('positive_2', 'fortitude.png')
        this.load.image('positive_3', 'leadership.png')
        this.load.image('positive_4', 'discipline.png')
        this.load.image('positive_5', 'playtest.png')
        this.load.image('tradeoff_1', 'comforteating.png')
        this.load.image('tradeoff_2', 'outonthetown.png')
        this.load.image('tradeoff_3', 'studysessionwithafriend.png')
        this.load.image('tradeoff_4', 'passionproject.png')
        this.load.image('tradeoff_5', 'acallfromhome.png')
        this.load.image('negative_1', 'afightbetweenfriends.png')
        this.load.image('negative_2', 'aroughday.png')
        this.load.image('negative_3', 'reasonablecrashout.png')
        this.load.image('negative_4', 'thedreadedeep.png')
        this.load.image('negative_5', 'afail.png')
        this.load.image('intro', 'intro.png')
        this.load.image('mental_health_0', 'mentalhealth0ending.png')
        this.load.image('physical_health_0', 'physicalhealth0ending.png')
        this.load.image('pass', 'passending.png')
        this.load.image('fail', 'failending.png')

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
        /*
        this.load.spritesheet('button4', '200x100button4.png', {
            frameWidth: 200,
            frameHeight: 100,
        })
        */
        this.load.spritesheet('daytonight', '150x150daytonightspritesheet.png', {
            frameWidth: 150,
            frameHeight: 150,
        })
        this.load.spritesheet('nighttoday', '150x150nighttodayspritesheet.png', {
            frameWidth: 150,
            frameHeight: 150,
        })

        // audio
        this.load.audio('pencil', 'pencil_scribble.mp3')
        this.load.audio('music', 'romansenykmusic.mp3')
        this.load.audio('win', 'fanfare.ogg')
        this.load.audio('lose', 'losetrumpet.mp3')
    }

    create() {
        this.intro_endingTextConfig = {
            fontFamily: 'Handwriting',
            fontSize: '35px',
            color: '#222222',
            align: 'center',
            wordWrap: { width: 750 }
        }
        
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

        this.statsButtonConfig1 = {
            fontFamily: 'Handwriting',
            fontSize: '35px',
            color: '#222222',
            align: 'center',
            wordWrap: { width: 150 }
        }

        this.statsButtonConfig2 = {
            fontFamily: 'Handwriting',
            fontSize: '25px',
            color: '#727272',
            align: 'center',
            wordWrap: { width: 150 }
        }

        this.add.text(-1000, -1000, '.', { fontFamily: 'Handwriting' }) // what's the purpose of this?

        this.introImage = this.add.sprite(0, 0, 'intro').setDepth(100).setOrigin(0).setInteractive()

        this.gameActive = true
        this.eventsPerDay = 1
        this.daysRemaining = 5
        //this.days = this.add.text(360, 10, `${this.daysRemaining}`, { fontFamily: 'Handwriting', fontSize: '45px', color: '#333333'}).setDepth(1)

        document.fonts.ready.then(() => {
            this.days = this.add.text(360, 10, `${this.daysRemaining}`, { fontFamily: 'Handwriting', fontSize: '45px', color: '#333333'}).setDepth(1)
            this.introText = this.add.text(50, 350, 'You are a college student, and the dreaded week of finals has crept up on you once again!\n\nCan you survive the week and pass your final exam?', this.intro_endingTextConfig).setOrigin(0).setDepth(100)
            this.continueText = this.add.text(700, 550, '[click to continue]', this.eventBodyConfig).setOrigin(1, 0).setDepth(100)
            this.MHEndingText = this.add.text(50, 350, 'You had a mental breakdown!\n\nYour loss of sense on reality prevented you from taking the test, so you failed. :(', this.intro_endingTextConfig).setOrigin(0).setAlpha(0).setDepth(100)
            this.PHEndingText = this.add.text(50, 350, 'Your body literally disintegrated from the pressure!\n\nBelieve it or not; college students need to take care of themselves too!', this.intro_endingTextConfig).setOrigin(0).setAlpha(0).setDepth(100)
            this.failEndingText = this.add.text(50, 350, 'Despite all your efforts, you failed your exam!\n\nGuess it\'s time to disappear into the woods forever!', this.intro_endingTextConfig).setOrigin(0).setAlpha(0).setDepth(100)
            this.passEndingText = this.add.text(50, 350, 'You actually did it! YOU PASSED!!\n\nTime to celebrate surviving another finals week! Enjoy it while you can. ;)', this.intro_endingTextConfig).setOrigin(0).setAlpha(0).setDepth(100)
            this.restartText = this.add.text(700, 550, '[press \'R\' to restart]', this.eventBodyConfig).setOrigin(1, 0).setAlpha(0).setDepth(100)
            this.daysUntilExam = this.add.text(120, 10, 'Days Until Exam:', this.textconfig)
            this.mentalHealthText = this.add.text(120, 80, 'Mental Health:', this.textconfig)
            this.physicalHealthText = this.add.text(450, 80, 'Physical Health:', this.textconfig)
            this.examPreparednessText = this.add.text(230, 260, 'Exam Preparedness:', this.textconfig)
            this.allWork = this.add.text(577, 180, 'All work and \nno play makes \nJack a dull boy', this.textconfig)
            this.REST = this.add.text(200, 480, 'REST', this.statsButtonConfig1).setOrigin(0.5)
            this.plusMental = this.add.text(200, 515, '+mental', this.statsButtonConfig2).setOrigin(0.5)
            this.EXERCISE = this.add.text(425, 480, 'EXERCISE', this.statsButtonConfig1).setOrigin(0.5)
            this.plusPhysical = this.add.text(425, 515, '+physical', this.statsButtonConfig2).setOrigin(0.5)
            this.STUDY = this.add.text(650, 480, 'STUDY', this.statsButtonConfig1).setOrigin(0.5)
            this.plusPrep = this.add.text(650, 515, '+prep', this.statsButtonConfig2).setOrigin(0.5)
        })

        this.background = this.add.tileSprite(0, 0, 800, 600, 'background').setOrigin(0).setDepth(0)
        this.postitnote = this.add.tileSprite(550, 169, 250, 250, 'postitnote').setOrigin(0).setDepth(0)

        this.MHEndingImage = this.add.sprite(400, 25, 'mental_health_0').setOrigin(0.5, 0).setAlpha(0).setDepth(100).setInteractive().setScale(0.5)
        this.PHEndingImage = this.add.sprite(400, 25, 'physical_health_0').setOrigin(0.5, 0).setAlpha(0).setDepth(100).setInteractive().setScale(0.5)
        this.failEndingImage = this.add.sprite(400, 25, 'fail').setOrigin(0.5, 0).setAlpha(0).setDepth(100).setInteractive().setScale(0.5)
        this.passEndingImage = this.add.sprite(400, 25, 'pass').setOrigin(0.5, 0).setAlpha(0).setDepth(100).setInteractive().setScale(0.5)

        this.currentFrame = 0
        this.sun_moonStages = this.add.sprite(440, 40, 'daytonight', 0).setOrigin(0.5).setDisplaySize(80, 80)

        this.mentalhealth = this.add.sprite(230, 151, 'mentalhealth', 3)
        this.physicalhealth = this.add.sprite(570, 151, 'physicalhealth', 3)
        this.exampreparedness = this.add.sprite(360, 327, 'exampreparedness', 0)

        this.button1 = this.add.sprite(200, 495, 'button1', 0).setInteractive({ useHandCursor: true })
        this.button2 = this.add.sprite(425, 495, 'button2', 0).setInteractive({ useHandCursor: true })
        this.button3 = this.add.sprite(650, 495, 'button3', 0).setInteractive({ useHandCursor: true })
        //this.button4 = this.add.sprite(570, 550, 'button4', 0).setInteractive()

        this.pencilSFX = this.sound.add('pencil')
        this.win = this.sound.add('win')
        this.lose = this.sound.add('lose')
        this.music = this.sound.add('music')
        this.music.play({ loop: true, detune: 200 })

        this.mentalhealthvalue = 3
        this.physicalhealthvalue = 3
        this.exampreparednessvalue = 0
        this.eventActive = false
        this.currentEvent = null

        this.randomEvents = [
            // Positive Events
            {
                key: 'positive_1',
                title: 'Good Grade!',
                body: 'You aced an exam! Your hard work has paid off.',
                options: [
                    { text: 'Celebrate!', mental: 1, physical: 1, prep: 1 },
                    { text: 'Keep studying for the next one.', mental: 0, physical: 0, prep: 3 },
                    { text: 'Take a break and relax.', mental: 2, physical: 1, prep: 0 }
                ]
            },
            {
                // this is very sweet :)
                key: 'positive_2',
                title: 'Fortitude',
                body: 'It\'s easy to forget sometimes that you\'re doing all this for a reason. But now you remember...',
                options: [
                    { text: 'You can do it!', mental: 1, physical: 0, prep: 2 },
                    { text: 'There\'s more to life than study.', mental: 1, physical: 2, prep: 0 },
                    { text: 'Things are going to be okay.', mental: 1, physical: 1, prep: 1 }
                ]
            },
            {
                key: 'positive_3',
                title: 'Leadership',
                body: 'Your team on a group project have come to respect you, and even admire you. They look to you for support during a hard time. You tell them...',
                options: [
                    { text: 'You\'ve all done great work. You should be proud of yourselves.', mental: 2, physical: 0, prep: 0 },
                    { text: 'Remember - you all still have needs. Go outside from time to time.', mental: 0, physical: 2, prep: 0 },
                    { text: 'One final push and we\'re done!', mental: 0, physical: 0, prep: 2 }
                ]
            },
            {
                key: 'positive_4',
                title: 'Discipline',
                body: 'You have been consistently putting in the effort to study and improve your skills. Your dedication is paying off.',
                options: [
                    { text: 'Feel pride and reassurance in your progress.', mental: 2, physical: 0, prep: 1 },
                    { text: 'You take a walk - and feel good about it.', mental: 1, physical: 2, prep: 0 },
                    { text: 'Push through and finish everything today.', mental: 0, physical: 0, prep: 3 }
                ]
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
                    { text: 'Fuck this, this isn\'t worth it.', mental: -2, physical: 0, prep: 1 },
                    { text: 'Let\'s just fight. Winner is right.', mental: 0, physical: 1, prep: -2 },
                    { text: 'JUST SHUT UP! BOTH OF YOU!', mental: 1, physical: -2, prep: 0 },
                ]
            },
            {
                key: 'negative_2',
                title: 'A Rough Day',
                body: 'Everything seems to be going wrong today. You feel overwhelmed and exhausted. You say...',
                options: [
                    { text: 'It is what it is...', mental: -1, physical: 0, prep: 0 },
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
            {
                key: 'negative_4',
                title: 'The Dreaded Eep',
                body: 'Young or not, you\'re still human. You\'re feeling tired and you need to sleep sometime tonight. You...',
                options: [
                    { text: 'Pass out where you are and slump over on your keyboard.', mental: -1, physical: 1, prep: -1 },
                    { text: 'Drag yourself to bed.', mental: 1, physical: -1, prep: -1 },
                    { text: 'Sleep is optional. Said so in my CMPM-146 syllabus.', mental: -2, physical: -2, prep: 2 }
                ]

            },
            {
                key: 'negative_5',
                title: 'A Fail?!',
                body: 'You thought it was fine. It seemed easy at the time. But you failed an exam despite your best efforts - what now?',
                options: [
                    { text: 'Stay up and study all night for the next exam.', mental: -3, physical: -3, prep: 1 },
                    { text: 'Ignore it. Surely this doesn\'t indicate a pattern.', mental: -3, physical: 1, prep: -3 },
                    { text: 'Run away screaming into the woods.', mental: 1, physical: -3, prep: -3 }
                ]

            },
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
        /*
        this.button4.on('pointerover', () => {
            this.button4.setFrame(1)
        })
        this.button4.on('pointerout', () => {
            this.button4.setFrame(0)
        })
        */

        this.introImage.on('pointerdown', () => {
            this.introImage.setAlpha(0)
            this.introText.setAlpha(0)
            this.continueText.setAlpha(0)
            this.pencilSFX.play()
        })

        this.button1.on('pointerdown', () => {
            if (this.eventActive) return
            this.applyStatChange('mental', 1)
            console.log('Adding 1 to mental...')
            this.showRandomEvent()
            this.pencilSFX.play()
        })

        this.button2.on('pointerdown', () => {
            if (this.eventActive) return
            this.applyStatChange('physical', 1)
            console.log('Adding 1 to physical...')
            this.showRandomEvent()
            this.pencilSFX.play()
        })

        this.button3.on('pointerdown', () => {
            if (this.eventActive) return
            this.applyStatChange('prep', 1)
            console.log('Adding 1 to prep...')
            this.showRandomEvent()
            this.pencilSFX.play()
        })

        /*
        this.button4.on('pointerdown', () => {
            if (this.eventActive) return
            this.applyStatChange('physical', 1)
        })
        */

        this.input.keyboard.on('keydown-R', () => {
            if (!this.gameActive) {
                this.restartGame()
                this.pencilSFX.play()
                this.music.play({ loop: true, detune: 200 })
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
                .setInteractive({ useHandCursor: true })

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
                this.pencilSFX.play()
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

        this.eventImage.setTexture(eventData.key).setDisplaySize(150, 150)
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
                this.mentalhealth.texture.frameTotal - 2
            )
            this.mentalhealth.setFrame(this.mentalhealthvalue)
            return
        }

        if (statName === 'physical') {
            this.physicalhealthvalue = Phaser.Math.Clamp(
                this.physicalhealthvalue + amount,
                0,
                this.physicalhealth.texture.frameTotal - 2
            )
            this.physicalhealth.setFrame(this.physicalhealthvalue)
            return
        }

        if (statName === 'prep') {
            this.exampreparednessvalue = Phaser.Math.Clamp(
                this.exampreparednessvalue + amount,
                0,
                this.exampreparedness.texture.frameTotal - 2
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

        if (this.mentalHealthEnding()) {
            this.music.stop(true)
            this.lose.play()
            this.gameActive = false
            this.hideEverything()
            this.MHEndingImage.setAlpha(1)
            this.MHEndingText.setAlpha(1)
            this.restartText.setAlpha(1)
        } else if (this.physicalHealthEnding()) {
            this.music.stop(true)
            this.lose.play()
            this.gameActive = false
            this.hideEverything()
            this.PHEndingImage.setAlpha(1)
            this.PHEndingText.setAlpha(1)
            this.restartText.setAlpha(1)
        } else {
            this.progressDay()
        }

        console.log(
            `Selected option ${optionIndex + 1} for ${this.currentEvent.title}:`,
            selectedOption
        )

        this.hideRandomEvent()
    }

    progressDay () {
        console.log(`Event #${this.eventsPerDay}`)
        if (this.eventsPerDay > 2) {
            this.daysRemaining--
            this.days.text = `${this.daysRemaining}`
            this.eventsPerDay = 1
            this.currentFrame = 0
        } else {
            this.eventsPerDay++
            this.currentFrame = this.currentFrame + 2
        }
        this.sun_moonStages.setFrame(this.currentFrame)
        
        if (!this.daysRemaining) {
            if (this.exampreparednessvalue >= 3) {
                this.music.stop(true)
                this.win.play()
                this.gameActive = false
                this.hideEverything()
                this.passEndingImage.setAlpha(1)
                this.passEndingText.setAlpha(1)
                this.restartText.setAlpha(1)
            } else {
                this.music.stop(true)
                this.lose.play()
                this.gameActive = false
                this.hideEverything()
                this.failEndingImage.setAlpha(1)
                this.failEndingText.setAlpha(1)
                this.restartText.setAlpha(1)
            }
        } 
    }

    mentalHealthEnding () {
        if (!this.mentalhealthvalue) {
            return true
        }
        return false
    }

    physicalHealthEnding () {
        if (!this.physicalhealthvalue) {
            return true
        }
        return false
    }

    restartGame () {
        this.hideEverything()
        this.daysRemaining = 5
        this.days.text =this.daysRemaining
        this.eventsPerDay = 1
        this.sun_moonStages.setFrame(0)
        this.mentalhealthvalue = 3
        this.applyStatChange('mental', 0)
        this.physicalhealthvalue = 3
        this.applyStatChange('physical', 0)
        this.exampreparednessvalue = 0
        this.applyStatChange('prep', 0)
        this.gameActive = true
        this.showEverything()
    }
    
    hideEverything () {
        this.days.setAlpha(0)
        this.daysUntilExam.setAlpha(0)
        this.mentalHealthText.setAlpha(0)
        this.physicalHealthText.setAlpha(0)
        this.examPreparednessText.setAlpha(0)
        this.allWork.setAlpha(0)
        this.REST.setAlpha(0)
        this.plusMental.setAlpha(0)
        this.EXERCISE.setAlpha(0)
        this.plusPhysical.setAlpha(0)
        this.STUDY.setAlpha(0)
        this.plusPrep.setAlpha(0)
        this.postitnote.setAlpha(0)
        this.sun_moonStages.setAlpha(0)
        this.mentalhealth.setAlpha(0)
        this.physicalhealth.setAlpha(0)
        this.exampreparedness.setAlpha(0)
        this.button1.setAlpha(0)
        this.button2.setAlpha(0)
        this.button3.setAlpha(0)
        this.MHEndingImage.setAlpha(0)
        this.MHEndingText.setAlpha(0)
        this.PHEndingImage.setAlpha(0)
        this.PHEndingText.setAlpha(0)
        this.failEndingImage.setAlpha(0)
        this.failEndingText.setAlpha(0)
        this.passEndingImage.setAlpha(0)
        this.passEndingText.setAlpha(0)
        this.restartText.setAlpha(0)
    }

    showEverything () {
        this.days.setAlpha(1)
        this.daysUntilExam.setAlpha(1)
        this.mentalHealthText.setAlpha(1)
        this.physicalHealthText.setAlpha(1)
        this.examPreparednessText.setAlpha(1)
        this.allWork.setAlpha(1)
        this.REST.setAlpha(1)
        this.plusMental.setAlpha(1)
        this.EXERCISE.setAlpha(1)
        this.plusPhysical.setAlpha(1)
        this.STUDY.setAlpha(1)
        this.plusPrep.setAlpha(1)
        this.postitnote.setAlpha(1)
        this.sun_moonStages.setAlpha(1)
        this.mentalhealth.setAlpha(1)
        this.physicalhealth.setAlpha(1)
        this.exampreparedness.setAlpha(1)
        this.button1.setAlpha(1)
        this.button2.setAlpha(1)
        this.button3.setAlpha(1)
    }

    update() {
    }
}